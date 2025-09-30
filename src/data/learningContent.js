// Comprehensive AI Learning Content Data
export const learningModules = {
  fundamentals: {
    id: 'fundamentals',
    title: 'AI Fundamentals',
    description: 'Core concepts, history, and types of AI',
    icon: 'Brain',
    color: 'bg-blue-500',
    totalLessons: 4,
    estimatedHours: 6,
    lessons: [
      {
        id: 'intro-to-ai',
        title: 'Introduction to Artificial Intelligence',
        duration: '90 min',
        type: 'lesson',
        content: {
          overview: 'Explore the fascinating world of artificial intelligence, its history, and fundamental concepts.',
          sections: [
            {
              title: 'What is Artificial Intelligence?',
              content: `Artificial Intelligence (AI) represents the theory and development of computer systems capable of performing tasks that traditionally require human intelligence. At its core, AI enables machines to simulate human cognitive functions such as learning, reasoning, problem-solving, and decision-making.

The field of AI encompasses various approaches and methodologies designed to create intelligent systems. These systems can process information, recognize patterns, make predictions, and adapt to new situations without explicit programming for every scenario.

Modern AI applications surround us in daily life, from voice assistants like Siri and Alexa to recommendation systems on Netflix and Amazon, autonomous vehicles, and medical diagnostic tools. The goal is not necessarily to replicate human intelligence exactly, but to create systems that can perform intelligent tasks effectively.`
            },
            {
              title: 'Brief History of AI',
              content: `The journey of artificial intelligence began in the 1950s with visionary computer scientists who imagined machines that could think. Alan Turing proposed the famous "Turing Test" in 1950 as a measure of machine intelligence.

The term "Artificial Intelligence" was coined by John McCarthy in 1956 during the Dartmouth Conference, which is considered the birth of AI as an academic discipline. Early pioneers like Marvin Minsky, Herbert Simon, and Allen Newell laid the groundwork for modern AI research.

The field has experienced several "AI winters" - periods of reduced funding and interest - followed by renewed enthusiasm driven by technological breakthroughs. The current AI renaissance began around 2010, fueled by advances in deep learning, increased computational power, and the availability of large datasets.`
            },
            {
              title: 'Types of AI Systems',
              content: `AI systems can be categorized in several ways. One common classification divides AI into three types based on capabilities:

**Narrow AI (Weak AI)**: These systems are designed to perform specific tasks exceptionally well but cannot generalize beyond their programmed domain. Examples include chess-playing computers, image recognition systems, and language translators.

**General AI (Strong AI)**: This theoretical form of AI would possess human-level intelligence across all domains, with the ability to understand, learn, and apply knowledge flexibly. True AGI remains a goal rather than a current reality.

**Superintelligence**: A hypothetical form of AI that would surpass human intelligence in all aspects. This concept, while fascinating, remains highly speculative and is the subject of ongoing debate among researchers and ethicists.`
            }
          ],
          keyTakeaways: [
            'AI enables machines to perform tasks requiring human-like intelligence',
            'The field has evolved significantly since the 1950s with periods of progress and setbacks',
            'Current AI systems are primarily narrow AI, specialized for specific tasks',
            'AI applications are increasingly integrated into everyday technology and services'
          ]
        }
      },
      {
        id: 'ai-vs-ml-vs-dl',
        title: 'AI vs Machine Learning vs Deep Learning',
        duration: '75 min',
        type: 'lesson',
        content: {
          overview: 'Understand the relationships and distinctions between AI, Machine Learning, and Deep Learning.',
          sections: [
            {
              title: 'The Hierarchical Relationship',
              content: `Understanding the relationship between AI, Machine Learning, and Deep Learning is crucial for anyone entering the field. These terms are often used interchangeably, but they represent different concepts with a clear hierarchical structure.

Imagine three concentric circles: Artificial Intelligence forms the largest outer circle, Machine Learning sits within AI as a subset, and Deep Learning exists as a subset within Machine Learning. This nested relationship means that all Deep Learning is Machine Learning, all Machine Learning is AI, but not all AI is Machine Learning.

This hierarchy reflects the evolution of the field, where each inner circle represents a more specialized and recent development in achieving artificial intelligence.`
            },
            {
              title: 'Artificial Intelligence: The Broad Vision',
              content: `Artificial Intelligence encompasses any technique that enables machines to mimic human intelligence. This broad definition includes rule-based systems, expert systems, and symbolic reasoning approaches that don't necessarily involve learning from data.

Traditional AI systems, like the chess-playing computer Deep Blue, operate on pre-programmed rules and extensive databases of possible moves. These systems can perform intelligent tasks but don't improve their performance through experience.

AI includes various approaches such as:
- Rule-based expert systems
- Search algorithms
- Knowledge representation
- Natural language processing
- Computer vision
- Robotics

The key characteristic of AI is the ability to perform tasks that would typically require human intelligence, regardless of the underlying methodology.`
            },
            {
              title: 'Machine Learning: Learning from Data',
              content: `Machine Learning represents a paradigm shift in AI, focusing on systems that can automatically learn and improve from experience without being explicitly programmed for every scenario. Instead of hand-coding rules, ML systems identify patterns in data and make predictions or decisions based on these learned patterns.

The fundamental principle of machine learning is that algorithms can automatically improve their performance on a specific task through experience. This experience comes in the form of data - the more relevant, high-quality data an ML system processes, the better it typically performs.

Machine Learning encompasses several approaches:
- **Supervised Learning**: Learning from labeled examples
- **Unsupervised Learning**: Finding patterns in unlabeled data
- **Reinforcement Learning**: Learning through interaction and feedback

Examples include email spam filters that learn to identify spam patterns, recommendation systems that learn user preferences, and fraud detection systems that identify suspicious transactions.`
            },
            {
              title: 'Deep Learning: Neural Network Revolution',
              content: `Deep Learning represents the cutting edge of machine learning, utilizing artificial neural networks with multiple layers (hence "deep") to model and understand complex patterns in data. These networks are inspired by the structure and function of the human brain, though they operate quite differently.

The "deep" in deep learning refers to the multiple layers of artificial neurons that process information. Each layer learns increasingly complex features - for example, in image recognition, early layers might detect edges and shapes, while deeper layers recognize objects and scenes.

Deep Learning has revolutionized AI capabilities in:
- **Computer Vision**: Image and video recognition, medical imaging
- **Natural Language Processing**: Language translation, text generation
- **Speech Recognition**: Voice assistants, transcription services
- **Game Playing**: Systems like AlphaGo that master complex games

The power of deep learning lies in its ability to automatically discover relevant features in data, eliminating much of the manual feature engineering required in traditional machine learning approaches.`
            }
          ],
          keyTakeaways: [
            'AI is the broadest concept encompassing all intelligent machine behavior',
            'Machine Learning is a subset of AI focused on learning from data',
            'Deep Learning is a subset of ML using multi-layered neural networks',
            'Each level represents increasing sophistication and automation in learning'
          ]
        }
      },
      {
        id: 'real-world-applications',
        title: 'Real-World AI Applications',
        duration: '60 min',
        type: 'lesson',
        content: {
          overview: 'Explore how AI is transforming industries and daily life through practical applications.',
          sections: [
            {
              title: 'AI in Healthcare',
              content: `Healthcare represents one of the most impactful applications of artificial intelligence, with the potential to save lives and improve patient outcomes. AI systems are revolutionizing medical diagnosis, treatment planning, and drug discovery.

**Medical Imaging and Diagnosis**: AI algorithms can analyze medical images with remarkable accuracy, often matching or exceeding human radiologists in detecting conditions like cancer, fractures, and neurological disorders. Systems like Google's DeepMind have demonstrated the ability to diagnose over 50 eye diseases from retinal scans.

**Drug Discovery**: Traditional drug development takes 10-15 years and costs billions of dollars. AI is accelerating this process by predicting molecular behavior, identifying promising compounds, and optimizing clinical trials. Companies like DeepMind's AlphaFold have made breakthrough predictions about protein structures, potentially revolutionizing drug design.

**Personalized Treatment**: AI analyzes patient data, genetic information, and treatment histories to recommend personalized treatment plans. This precision medicine approach ensures patients receive the most effective treatments with minimal side effects.`
            },
            {
              title: 'AI in Transportation',
              content: `The transportation industry is undergoing a fundamental transformation driven by AI technologies, with autonomous vehicles representing the most visible application.

**Autonomous Vehicles**: Self-driving cars use a combination of computer vision, sensor fusion, and deep learning to navigate roads safely. Companies like Tesla, Waymo, and Uber are developing systems that can handle complex driving scenarios, from highway cruising to urban navigation.

**Traffic Optimization**: AI systems analyze traffic patterns in real-time to optimize traffic light timing, reduce congestion, and improve fuel efficiency. Cities worldwide are implementing smart traffic management systems that adapt to changing conditions.

**Logistics and Supply Chain**: Companies like Amazon and FedEx use AI to optimize delivery routes, predict demand, and manage warehouse operations. These systems can process thousands of variables to ensure packages arrive efficiently and on time.`
            },
            {
              title: 'AI in Finance',
              content: `The financial industry has embraced AI for risk assessment, fraud detection, and algorithmic trading, transforming how financial services operate.

**Fraud Detection**: AI systems analyze transaction patterns in real-time to identify potentially fraudulent activities. These systems can detect subtle anomalies that might escape human notice, protecting both consumers and financial institutions.

**Algorithmic Trading**: High-frequency trading systems use AI to make split-second investment decisions based on market data, news sentiment, and economic indicators. These systems can execute thousands of trades per second, capitalizing on minute market movements.

**Credit Scoring and Risk Assessment**: AI models analyze vast amounts of data to assess creditworthiness and loan default risk more accurately than traditional methods. This enables more inclusive lending while maintaining financial stability.`
            },
            {
              title: 'AI in Entertainment and Media',
              content: `Entertainment and media companies leverage AI to create personalized experiences, generate content, and optimize distribution strategies.

**Content Recommendation**: Streaming services like Netflix and Spotify use sophisticated AI algorithms to recommend movies, shows, and music based on user preferences, viewing history, and similar user behaviors. These systems drive significant engagement and user satisfaction.

**Content Creation**: AI is beginning to create original content, from writing news articles and generating music to creating visual art and even producing short films. While still in early stages, these applications hint at AI's creative potential.

**Gaming**: AI enhances gaming experiences through intelligent NPCs (non-player characters), procedural content generation, and adaptive difficulty systems that adjust to player skill levels in real-time.`
            }
          ],
          keyTakeaways: [
            'AI is transforming critical industries including healthcare, transportation, and finance',
            'Real-world AI applications often combine multiple AI techniques for optimal results',
            'AI systems are becoming increasingly integrated into daily life and business operations',
            'The impact of AI extends beyond automation to enabling entirely new capabilities and services'
          ]
        }
      },
      {
        id: 'fundamentals-quiz',
        title: 'AI Fundamentals Quiz',
        duration: '15 min',
        type: 'quiz',
        questions: [
          {
            id: 1,
            question: 'Which statement best describes the relationship between AI, Machine Learning, and Deep Learning?',
            options: [
              'They are completely separate fields with no overlap',
              'Deep Learning is a subset of Machine Learning, which is a subset of AI',
              'AI is a subset of Machine Learning',
              'They are different names for the same concept'
            ],
            correct: 1,
            explanation: 'Deep Learning is a subset of Machine Learning, which in turn is a subset of Artificial Intelligence. This creates a hierarchical relationship where each inner circle represents a more specialized approach.'
          },
          {
            id: 2,
            question: 'What is the primary difference between traditional AI systems and Machine Learning systems?',
            options: [
              'Traditional AI is faster than Machine Learning',
              'Machine Learning systems can learn and improve from data, while traditional AI relies on pre-programmed rules',
              'Traditional AI is more accurate than Machine Learning',
              'There is no significant difference'
            ],
            correct: 1,
            explanation: 'The key distinction is that Machine Learning systems can automatically learn and improve from experience (data), while traditional AI systems operate on pre-programmed rules and logic.'
          },
          {
            id: 3,
            question: 'Which of the following is an example of Narrow AI?',
            options: [
              'A chess-playing computer that only plays chess',
              'A hypothetical AI that can perform any intellectual task a human can',
              'An AI system that surpasses human intelligence in all areas',
              'A general-purpose problem-solving AI'
            ],
            correct: 0,
            explanation: 'Narrow AI systems are designed for specific tasks. A chess-playing computer exemplifies this as it excels at chess but cannot generalize to other domains.'
          }
        ]
      }
    ]
  },
  
  algorithms: {
    id: 'algorithms',
    title: 'Machine Learning Algorithms',
    description: 'Decision trees, random forests, clustering techniques',
    icon: 'Code',
    color: 'bg-green-500',
    totalLessons: 7,
    estimatedHours: 12,
    lessons: [
      {
        id: 'ml-introduction',
        title: 'Introduction to Machine Learning',
        duration: '90 min',
        type: 'lesson',
        content: {
          overview: 'Understand the core concepts and types of machine learning approaches.',
          sections: [
            {
              title: 'What is Machine Learning?',
              content: `Machine Learning is a method of data analysis that automates analytical model building. It is based on the idea that systems can learn from data, identify patterns, and make decisions with minimal human intervention.

Unlike traditional programming where we write explicit instructions for every scenario, machine learning allows computers to learn patterns from examples and make predictions or decisions about new, unseen data. This paradigm shift has enabled computers to tackle problems that were previously impossible to solve with traditional programming approaches.

The core principle of machine learning is generalization - the ability to perform well on new, previously unseen data based on patterns learned from training data. This capability makes ML systems incredibly powerful for tasks involving pattern recognition, prediction, and decision-making.`
            },
            {
              title: 'Types of Machine Learning',
              content: `Machine Learning approaches are typically categorized into three main types based on the nature of the learning signal or feedback available to the learning system:

**Supervised Learning**: In supervised learning, algorithms learn from labeled training data. The system is provided with input-output pairs and learns to map inputs to correct outputs. This is like learning with a teacher who provides the correct answers. Common applications include email spam detection, image classification, and medical diagnosis.

**Unsupervised Learning**: These algorithms work with data that has no labeled responses. The system tries to learn the underlying structure or patterns in the data without being told what to look for. It's like learning without a teacher, discovering hidden patterns independently. Applications include customer segmentation, anomaly detection, and data compression.

**Reinforcement Learning**: This approach learns through interaction with an environment, receiving rewards or penalties for actions taken. The system learns to maximize cumulative reward over time. It's similar to learning through trial and error, like how humans learn to play games or navigate new environments.`
            }
          ],
          keyTakeaways: [
            'Machine Learning enables computers to learn patterns from data automatically',
            'Supervised learning uses labeled data to learn input-output mappings',
            'Unsupervised learning discovers hidden patterns in unlabeled data',
            'Reinforcement learning optimizes behavior through environmental feedback'
          ]
        }
      }
      // Additional lessons would be added here following the same structure
    ]
  }
  
  // Additional modules (llms, advanced, data) would follow the same structure
}

// Glossary data with 200+ AI terms
export const glossaryTerms = [
  {
    term: 'Artificial Intelligence (AI)',
    definition: 'The simulation of human intelligence in machines that are programmed to think and learn like humans.',
    category: 'Fundamentals',
    relatedTerms: ['Machine Learning', 'Deep Learning', 'Neural Networks']
  },
  {
    term: 'Machine Learning (ML)',
    definition: 'A subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.',
    category: 'Fundamentals',
    relatedTerms: ['Supervised Learning', 'Unsupervised Learning', 'Algorithm']
  },
  {
    term: 'Deep Learning',
    definition: 'A subset of machine learning based on artificial neural networks with multiple layers (deep neural networks).',
    category: 'Fundamentals',
    relatedTerms: ['Neural Networks', 'Backpropagation', 'Convolutional Neural Networks']
  },
  {
    term: 'Algorithm',
    definition: 'A set of rules or instructions given to an AI, neural network, or other machine to help it learn on its own.',
    category: 'Fundamentals',
    relatedTerms: ['Machine Learning', 'Training', 'Model']
  },
  {
    term: 'Neural Network',
    definition: 'A computing system inspired by biological neural networks, consisting of interconnected nodes (neurons) that process information.',
    category: 'Deep Learning',
    relatedTerms: ['Deep Learning', 'Perceptron', 'Activation Function']
  },
  {
    term: 'Supervised Learning',
    definition: 'A type of machine learning where the algorithm learns from labeled training data to make predictions on new data.',
    category: 'Machine Learning',
    relatedTerms: ['Training Data', 'Labels', 'Classification', 'Regression']
  },
  {
    term: 'Unsupervised Learning',
    definition: 'A type of machine learning that finds hidden patterns in data without labeled examples.',
    category: 'Machine Learning',
    relatedTerms: ['Clustering', 'Dimensionality Reduction', 'Association Rules']
  },
  {
    term: 'Reinforcement Learning',
    definition: 'A type of machine learning where an agent learns to make decisions by taking actions in an environment to maximize reward.',
    category: 'Machine Learning',
    relatedTerms: ['Agent', 'Environment', 'Reward', 'Policy']
  },
  {
    term: 'Training Data',
    definition: 'The dataset used to teach a machine learning algorithm to make predictions or decisions.',
    category: 'Data',
    relatedTerms: ['Test Data', 'Validation Data', 'Dataset']
  },
  {
    term: 'Overfitting',
    definition: 'When a model learns the training data too well, including noise, leading to poor performance on new data.',
    category: 'Model Performance',
    relatedTerms: ['Underfitting', 'Generalization', 'Cross-validation']
  }
  // Additional terms would continue here to reach 200+ terms
]

export const practicalExercises = [
  {
    id: 'decision-tree-builder',
    title: 'Build Your First Decision Tree',
    description: 'Interactive exercise to create and visualize a decision tree classifier',
    module: 'algorithms',
    difficulty: 'Beginner',
    estimatedTime: '30 min'
  },
  {
    id: 'clustering-demo',
    title: 'K-Means Clustering Visualization',
    description: 'Explore how k-means clustering groups data points',
    module: 'algorithms',
    difficulty: 'Beginner',
    estimatedTime: '25 min'
  },
  {
    id: 'llm-api-integration',
    title: 'Integrate with a Language Model API',
    description: 'Build a simple application using GPT or similar LLM API',
    module: 'llms',
    difficulty: 'Intermediate',
    estimatedTime: '45 min'
  }
]
