const LANGUAGE_COURSES = [
  'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Japanese', 'Korean', 'Mandarin Chinese', 'Arabic',
  'Hindi', 'Bengali', 'Urdu', 'Indonesian', 'Turkish', 'Vietnamese', 'Thai', 'Dutch', 'Polish', 'Greek',
  'Czech', 'Swedish', 'Danish', 'Finnish', 'Norwegian', 'Hungarian', 'Romanian', 'Bulgarian', 'Serbian', 'Croatian',
  'Slovak', 'Slovenian', 'Lithuanian', 'Latvian', 'Estonian', 'Hebrew', 'Persian (Farsi)', 'Swahili', 'Amharic', 'Yoruba',
  'Zulu', 'Afrikaans', 'Tagalog', 'Malay', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Punjabi', 'Kannada'
];

const PROGRAMMING_COURSES = [
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go',
  'Rust', 'TypeScript', 'SQL', 'HTML/CSS', 'Bash/Shell', 'R', 'MATLAB', 'Scala', 'Perl', 'Haskell'
];

const languageIntroLessonTemplates = (language) => [
  {
    key: 'sound-system',
    title: `How ${language} sounds in real conversation`,
    duration: '18 min',
    content: `Start with the rhythm of ${language} before memorizing lists of words. This lesson focuses on sound patterns, stress, and high-frequency pronunciation habits so you can understand native speakers sooner and avoid building bad habits.`,
    practice: `Listen for repeated sounds, shadow five short phrases, and record yourself saying a greeting, an introduction, and a simple question in ${language}.`,
  },
  {
    key: 'first-conversations',
    title: `Greetings, introductions, and survival phrases in ${language}`,
    duration: '24 min',
    content: `Build the first 20 phrases that unlock real interactions: greeting people, introducing yourself, asking for help, apologizing politely, and handling common day-to-day exchanges.`,
    practice: `Create a two-minute self-introduction, then role-play meeting a classmate, a shopkeeper, and a travel host in ${language}.`,
  },
  {
    key: 'useful-grammar',
    title: 'Core grammar without overwhelm',
    duration: '28 min',
    content: 'Instead of studying every rule at once, you will learn sentence patterns that carry the most meaning early on: subject + verb + object, basic questions, negation, and polite requests.',
    practice: 'Transform 10 statements into questions and negatives, then write five useful sentences you could use this week.',
  },
  {
    key: 'everyday-situations',
    title: 'Ordering food, asking directions, and daily routines',
    duration: '30 min',
    content: 'Apply your vocabulary to realistic everyday situations. You will work through mini-dialogues for transport, cafes, introductions, and short social interactions so the language feels usable immediately.',
    practice: 'Complete the travel checklist: order a meal, ask where something is, talk about your schedule, and respond to three common follow-up questions.',
  },
  {
    key: 'confidence-builder',
    title: 'Your first confidence-building speaking challenge',
    duration: '22 min',
    content: 'This wrap-up lesson combines listening, recall, and speaking drills to help you move from recognition to production. You will reuse the same language in different contexts to strengthen retention.',
    practice: `Deliver a 60-second spoken summary about yourself, your routine, and one plan for the weekend using only ${language}.`,
  },
];

const languageAdvancedLessonTemplates = (language) => [
  {
    key: 'natural-conversation',
    title: 'Natural conversation patterns and filler language',
    duration: '35 min',
    content: `Move beyond textbook phrases by learning how fluent speakers actually connect ideas, soften opinions, and keep conversations going in ${language}.`,
    practice: `Rewrite five simple sentences using more natural connectors, softeners, and transitions used in real ${language} conversations.`,
  },
  {
    key: 'listening-depth',
    title: 'Listening to fast speech, stories, and interviews',
    duration: '42 min',
    content: 'Train your ear for speed, reduced sounds, and informal speech. You will learn how to listen for meaning in chunks instead of translating word by word.',
    practice: 'Summarize a short story, identify three key phrases, and note where context helped you understand unfamiliar vocabulary.',
  },
  {
    key: 'professional-use',
    title: `${language} for meetings, networking, and professional settings`,
    duration: '38 min',
    content: 'Learn the phrases and structures needed to introduce projects, explain tradeoffs, ask clarifying questions, and participate more confidently in professional conversations.',
    practice: `Prepare a one-minute work update, ask two thoughtful follow-up questions, and close the conversation professionally in ${language}.`,
  },
  {
    key: 'culture',
    title: 'Cultural nuance, politeness, and tone',
    duration: '31 min',
    content: 'Fluency is not only grammar. This lesson focuses on formality, politeness, common social expectations, and how tone shifts meaning in different settings.',
    practice: 'Compare how you would speak to a friend, a teacher, and a customer service agent, then adjust your phrasing for each context.',
  },
  {
    key: 'writing',
    title: `Writing clearly in ${language}`,
    duration: '34 min',
    content: 'Strengthen your written communication with short emails, messages, and opinion paragraphs. You will focus on structure, cohesion, and high-value vocabulary.',
    practice: 'Write a short email, a social message, and a 120-word reflection using new vocabulary and connectors from this unit.',
  },
  {
    key: 'capstone',
    title: `${language} fluency capstone`,
    duration: '46 min',
    content: 'Bring everything together in a guided capstone. You will read, listen, speak, and write around one connected scenario so your skills reinforce each other.',
    practice: 'Complete the capstone interview, reflection, and speaking task, then identify the three weakest areas to revisit next week.',
  },
];

const programmingIntroLessonTemplates = (language) => [
  {
    key: 'mental-model',
    title: `Thinking like a ${language} developer`,
    duration: '20 min',
    content: `Start with the mental model behind ${language}: what kinds of problems it solves well, how developers structure code, and what makes the language productive in real projects.`,
    practice: `Write down three use cases where ${language} is a strong fit and one tradeoff to keep in mind when choosing it.`,
  },
  {
    key: 'syntax',
    title: `${language} syntax that matters on day one`,
    duration: '26 min',
    content: 'Learn the syntax you will use constantly: variables, conditions, loops, and basic data structures. The emphasis is on reading and predicting code, not memorizing trivia.',
    practice: 'Trace a short snippet by hand, then modify it to accept a different input and produce a different result.',
  },
  {
    key: 'functions',
    title: 'Functions, reusable logic, and clean habits',
    duration: '24 min',
    content: 'This lesson teaches how to break work into focused functions, name them well, and pass data clearly so your code stays understandable as it grows.',
    practice: 'Refactor repeated code into two helper functions and explain why the new version is easier to maintain.',
  },
  {
    key: 'debugging',
    title: 'Debugging with intention',
    duration: '29 min',
    content: 'New developers often guess. Here you will learn a repeatable debugging loop: reproduce the bug, inspect state, narrow the cause, and confirm the fix with a small test.',
    practice: 'Fix a broken example by writing the expected output first, then checking inputs, control flow, and edge cases.',
  },
  {
    key: 'mini-project',
    title: `${language} mini-project`,
    duration: '36 min',
    content: 'Apply everything in a small but complete build. The project is scoped to be achievable in one sitting while still feeling like a real deliverable.',
    practice: 'Finish the mini-project, then add one stretch feature of your own so you practice adapting code rather than only following instructions.',
  },
];

const programmingAdvancedLessonTemplates = (language) => [
  {
    key: 'architecture',
    title: `Architecting scalable ${language} applications`,
    duration: '39 min',
    content: `Learn how experienced teams structure larger ${language} systems. We cover modules, boundaries, shared utilities, and the difference between fast demos and maintainable products.`,
    practice: 'Map one existing app into layers and identify where you would place domain logic, infrastructure code, and UI or API concerns.',
  },
  {
    key: 'data-layer',
    title: 'Designing a dependable data layer',
    duration: '44 min',
    content: 'Go deeper into data modeling, validation, persistence, and error handling so your application behaves predictably under real usage.',
    practice: 'Design a small schema, define validation rules, and explain how you would handle invalid inputs without crashing the app.',
  },
  {
    key: 'auth',
    title: 'Authentication, authorization, and secure defaults',
    duration: '41 min',
    content: 'Security basics are part of functional engineering. This lesson covers identity, access control, secrets handling, and the mistakes that tend to show up first in student projects.',
    practice: 'Audit a simple auth flow and list the points where a missing check could expose user data or privileged actions.',
  },
  {
    key: 'integrations',
    title: 'Working with APIs, queues, and external services',
    duration: '37 min',
    content: 'Most real products depend on external services. You will learn patterns for API clients, retries, failure handling, and how to isolate integrations behind clean interfaces.',
    practice: 'Wrap one external dependency in a small service layer and describe how you would mock it in testing.',
  },
  {
    key: 'quality',
    title: 'Testing, observability, and maintainability',
    duration: '40 min',
    content: 'Shipping is not the end. This lesson introduces testing strategy, logging, monitoring, and the habits that keep a codebase healthy as more contributors join.',
    practice: 'Choose three high-risk behaviors in a feature and write down what unit, integration, or end-to-end test each one deserves.',
  },
  {
    key: 'capstone',
    title: `${language} production capstone`,
    duration: '52 min',
    content: 'The final module ties architecture, data, integrations, and testing together in a portfolio-ready capstone project with realistic constraints.',
    practice: 'Plan the capstone scope, build a thin vertical slice first, and document the technical choices you would present in an interview.',
  },
];

const buildCourse = ({
  id,
  title,
  description,
  category,
  price,
  thumbnail,
  duration,
  rating,
  students,
  instructor,
  level,
  lessons,
  requirements,
  outcomes,
  reviews,
  tags,
}) => ({
  id,
  title,
  description,
  category,
  price,
  thumbnail,
  duration,
  rating,
  students,
  instructor,
  level,
  lessons: lessons.map((lesson, index) => ({
    id: `${id}-${lesson.key}`,
    order: index + 1,
    ...lesson,
  })),
  requirements,
  outcomes,
  reviews,
  tags,
});

const languageCourses = LANGUAGE_COURSES.flatMap((language, index) => {
  const beginnerId = `free_lang_${index + 1}`;
  const advancedId = `premium_lang_${index + 1}`;

  return [
    buildCourse({
      id: beginnerId,
      title: `${language} for Beginners`,
      description: `A practical beginner track that helps you understand, speak, and use ${language} in real daily situations instead of only memorizing vocabulary lists.`,
      category: 'Language',
      price: 0,
      thumbnail: `https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=500&sig=${index}`,
      duration: '5h 00m',
      rating: Number((4.2 + (index % 5) * 0.1).toFixed(1)),
      students: 1800 + index * 37,
      instructor: `Coach ${language.split(' ')[0]} Rivera`,
      level: 'Beginner',
      lessons: languageIntroLessonTemplates(language),
      requirements: [
        'No prior experience required',
        '15 to 20 minutes a day for speaking practice',
        'A notebook or notes app for sentence drills',
      ],
      outcomes: [
        `Handle first conversations in ${language}`,
        `Understand high-frequency travel and daily phrases`,
        'Build a repeatable pronunciation and speaking routine',
      ],
      reviews: 180 + index * 11,
      tags: ['Speaking', 'Pronunciation', 'Travel', 'Daily Conversation'],
    }),
    buildCourse({
      id: advancedId,
      title: `Advanced ${language} Masterclass`,
      description: `A deeper fluency track for learners who want to think, speak, and write in ${language} with stronger confidence, nuance, and real-world range.`,
      category: 'Language',
      price: 49.99,
      thumbnail: `https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=500&sig=${index + 100}`,
      duration: '35h 00m',
      rating: Number((4.6 + (index % 4) * 0.1).toFixed(1)),
      students: 920 + index * 19,
      instructor: `Professor ${language.split(' ')[0]} Chen`,
      level: 'Advanced',
      lessons: languageAdvancedLessonTemplates(language),
      requirements: [
        `Comfort with basic ${language} phrases and sentence structure`,
        'Willingness to speak out loud and self-correct',
        'Interest in culture, tone, and authentic communication',
      ],
      outcomes: [
        `Speak more naturally in ${language}`,
        'Handle professional and social conversations with more control',
        'Write clear short-form messages and reflections',
      ],
      reviews: 95 + index * 7,
      tags: ['Fluency', 'Listening', 'Culture', 'Professional Communication'],
    }),
  ];
});

const programmingCourses = PROGRAMMING_COURSES.flatMap((language, index) => {
  const introId = `free_prog_${index + 1}`;
  const advancedId = `premium_prog_${index + 1}`;

  return [
    buildCourse({
      id: introId,
      title: `Introduction to ${language}`,
      description: `A project-first introduction to ${language} that helps beginners understand syntax, debugging, and how to build something useful quickly.`,
      category: 'Programming',
      price: 0,
      thumbnail: `https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=500&sig=${index + 200}`,
      duration: '8h 30m',
      rating: Number((4.1 + (index % 6) * 0.1).toFixed(1)),
      students: 2500 + index * 44,
      instructor: `${language} mentor A. Patel`,
      level: 'Beginner',
      lessons: programmingIntroLessonTemplates(language),
      requirements: [
        'Comfort using a computer and editing text files',
        'Curiosity about how software is built',
        'No prior programming experience required',
      ],
      outcomes: [
        `Read and write beginner-friendly ${language} code`,
        'Debug with a calmer, more structured process',
        'Complete a small project and explain how it works',
      ],
      reviews: 210 + index * 9,
      tags: ['Fundamentals', 'Debugging', 'Mini Project', 'Syntax'],
    }),
    buildCourse({
      id: advancedId,
      title: `Full-Stack ${language} Engineering`,
      description: `A practical engineering path focused on architecture, reliability, integrations, and production habits using ${language} in real applications.`,
      category: 'Programming',
      price: 99.99,
      thumbnail: `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=500&sig=${index + 300}`,
      duration: '60h 00m',
      rating: Number((4.7 + (index % 3) * 0.1).toFixed(1)),
      students: 780 + index * 14,
      instructor: `Lead engineer ${language.split('/')[0]} Morgan`,
      level: 'Advanced',
      lessons: programmingAdvancedLessonTemplates(language),
      requirements: [
        `Basic familiarity with ${language} syntax`,
        'Comfort reading APIs and project structure',
        'Motivation to build more maintainable software',
      ],
      outcomes: [
        `Design larger ${language} applications with clearer structure`,
        'Integrate external services more safely',
        'Build a portfolio-ready capstone with production thinking',
      ],
      reviews: 88 + index * 6,
      tags: ['Architecture', 'APIs', 'Security', 'Testing'],
    }),
  ];
});

export const COURSE_CATALOG = [...languageCourses, ...programmingCourses];

export const getCourseById = (id) =>
  COURSE_CATALOG.find((course) => course.id === id);
