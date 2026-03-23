import Order from '../models/Order.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import sendEmail from '../utils/sendEmail.js';

export const createOrder = async (req, res) => {
  try {
    const { courseId, price, paymentStatus } = req.body;

    const order = new Order({
      user: req.user._id,
      course: courseId,
      price,
      paymentStatus: paymentStatus || 'completed',
    });

    const createdOrder = await order.save();
    
    // Send confirmation email
    const course = await Course.findById(courseId);
    const user = await User.findById(req.user._id);
    
    if (user && user.email && course) {
      const emailContent = `
        <h2>Purchase Confirmation</h2>
        <p>Dear ${user.name},</p>
        <p>Thank you for purchasing the course <strong>${course.title}</strong>!</p>
        <p><strong>Course Details:</strong></p>
        <ul>
          <li>Course: ${course.title}</li>
          <li>Price: $${price}</li>
          <li>Status: ${paymentStatus === 'completed' ? 'Purchase Complete' : 'Processing'}</li>
        </ul>
        <p>You can now access this course in your dashboard. Happy learning!</p>
        <p>Best regards,<br>Spokeny Team</p>
      `;
      
      await sendEmail({
        email: user.email,
        subject: `Course Purchase Confirmation: ${course.title}`,
        htmlMessage: emailContent,
        message: `You have successfully purchased the course: ${course.title}`,
      });
    }
    
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('course', 'title price thumbnail');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
