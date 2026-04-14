import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      // Attempt to send Welcome Email
      try {
        await sendEmail({
          email: user.email,
          subject: 'Welcome to Spokeny! 🚀',
          htmlMessage: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #eaeaea; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h1 style="color: #0089b4; text-align: center; margin-bottom: 20px;">Welcome to Spokeny, ${user.name}! 🌍</h1>
              <p style="color: #4a5568; font-size: 16px; line-height: 1.7; text-align: center;">
                We are incredibly thrilled to have you join our interactive language learning community!
              </p>
              <div style="background-color: #f7fafc; padding: 20px; border-radius: 12px; margin: 25px 0;">
                <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin: 0;">
                  With Spokeny, you can:<br>
                  🔥 Earn XP and build daily study streaks<br>
                  🗣️ Practice instantly with our Real-Time AI Voice Translator<br>
                  📚 Master over 50 spoken languages visually
                </p>
              </div>
              <div style="text-align: center; margin: 35px 0;">
                <a href="http://localhost:5173/translator" style="background-color: #ff006e; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 30px; font-size: 16px; display: inline-block;">Start Translating Now</a>
              </div>
              <p style="color: #a0aec0; font-size: 14px; text-align: center; margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px;">
                Happy Learning,<br><strong style="color: #718096;">The Spokeny Team</strong>
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Error sending welcome email (check your .env credentials):', emailErr);
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        streak: user.streak,
        studyTime: user.studyTime,
        badges: user.badges,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      xp: user.xp,
      streak: user.streak,
      studyTime: user.studyTime,
      badges: user.badges,
      enrolledCourses: user.enrolledCourses,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { xpToAdd = 0, studyTimeToAdd = 0 } = req.body;
    
    user.xp = (user.xp || 0) + Number(xpToAdd);
    user.studyTime = (user.studyTime || 0) + Number(studyTimeToAdd);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    let oldDateZeroed = null;
    if (lastActive) {
      oldDateZeroed = new Date(lastActive.getTime());
      oldDateZeroed.setHours(0, 0, 0, 0);
    }

    if (!oldDateZeroed) {
      user.streak = 1;
    } else {
      const diffTime = today.getTime() - oldDateZeroed.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays === 1) {
        user.streak = (user.streak || 0) + 1;
      } else if (diffDays > 1) {
        user.streak = 1;
      }
    }

    user.lastActiveDate = new Date();
    
    await user.save();

    res.json({
      xp: user.xp,
      streak: user.streak,
      studyTime: user.studyTime,
      badges: user.badges
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
