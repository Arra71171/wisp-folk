require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');

const dummyQuests = [
  {
    id: '1',
    title: 'The Silk Road',
    description: 'Explore the ancient trade routes that connected the East and West, exchanging goods, ideas, and cultures.',
    era: 'Ancient China',
    image: 'https://picsum.photos/seed/quest1/400',
    xp: 100,
    quiz: [
      {
        question: 'What was the most valuable commodity traded along the Silk Road?',
        options: ['Gold', 'Silk', 'Spices', 'Jade'],
        correctAnswerIndex: 1,
        explanation: 'Silk was prized for its softness, beauty, and value, making it the most famous commodity of the Silk Road.',
      },
      {
        question: 'Which dynasty officially opened the Silk Road in China?',
        options: ['Qin Dynasty', 'Tang Dynasty', 'Han Dynasty', 'Ming Dynasty'],
        correctAnswerIndex: 2,
        explanation: 'The Han Dynasty, under Emperor Wu, officially opened the Silk Road in the 2nd century BCE, primarily for trade and to secure alliances.',
      },
    ],
  },
  { id: '2', title: 'Viking Sagas', description: 'Navigate the treacherous northern seas and uncover the epic tales of Norse heroes and gods.', era: 'Norse Mythology', image: 'https://picsum.photos/seed/quest2/400', xp: 150 },
  { id: '3', title: 'Pyramids of Giza', description: 'Uncover the secrets of the ancient pyramids and the pharaohs who built them.', era: 'Ancient Egypt', image: 'https://picsum.photos/seed/quest3/400', xp: 120 },
  { id: '4', title: 'The Samurai Way', description: 'Learn the code of Bushido and the ways of the legendary samurai warriors of feudal Japan.', era: 'Feudal Japan', image: 'https://picsum.photos/seed/quest4/400', xp: 130 },
  { id: '5', title: 'Roman Legions', description: 'March with the mighty Roman legions and discover the strategies that built an empire.', era: 'Roman Empire', image: 'https://picsum.photos/seed/quest5/400', xp: 110 },
  { id: '6', title: 'Mayan Prophecies', description: 'Delve into the mysteries of the Mayan civilization and their advanced understanding of astronomy.', era: 'Mesoamerica', image: 'https://picsum.photos/seed/quest6/400', xp: 140 },
];

async function seedDatabase() {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key must be provided in .env');
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  console.log('Seeding database...');

  for (const quest of dummyQuests) {
    const { data: questData, error: questError } = await supabase
      .from('quests')
      .insert([
        {
          title: quest.title,
          description: quest.description,
          era: quest.era,
          image: quest.image,
          xp: quest.xp,
        },
      ])
      .select()
      .single();

    if (questError) {
      console.error('Error inserting quest:', questError);
      continue;
    }

    console.log(`Inserted quest: ${questData.title}`);

    if (quest.quiz) {
      for (const quizQuestion of quest.quiz) {
        const { error: quizError } = await supabase.from('quiz_questions').insert([
          {
            quest_id: questData.id,
            question: quizQuestion.question,
            options: quizQuestion.options,
            correct_answer_index: quizQuestion.correctAnswerIndex,
            explanation: quizQuestion.explanation,
          },
        ]);

        if (quizError) {
          console.error('Error inserting quiz question:', quizError);
        }
      }
      console.log(`Inserted ${quest.quiz.length} quiz questions for ${questData.title}`);
    }
  }

  console.log('Database seeding complete.');
}

seedDatabase();
