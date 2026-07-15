export const categories = [
  {
    name: 'Outdoors',
    description: 'Fresh air, walking and small adventures.',
    image: '/images/park.jpg',
  },
  {
    name: 'Culture',
    description: 'See familiar streets with curious eyes.',
    image: '/images/city-view.jpg',
  },
  {
    name: 'Food',
    description: 'Cook, taste and share something local.',
    image: '/images/community.jpg',
  },
  {
    name: 'Kindness',
    description: 'Simple actions that make someone smile.',
    image: '/images/old-town.jpg',
  },
  {
    name: 'Creative',
    description: 'Take photos, draw and make something new.',
    image: '/images/street-art.jpg',
  },
  {
    name: 'Social',
    description: 'Good reasons to spend time together.',
    image: '/images/community.jpg',
  },
]

const questDetails = {
  1: {
    title: 'Leave a kind note in your neighborhood',
    category: 'Kindness',
    region: 'Tbilisi',
    city: 'Tbilisi',
    location: 'Sololaki neighborhood',
    difficulty: 'Easy',
    duration: '30 min',
    points: 80,
    image: '/images/old-town.jpg',
    description:
      'Choose one person you care about and make their day a little easier. Keep it simple and genuine.',
  },
  2: {
    title: 'Find three hidden details in Old Batumi',
    category: 'Culture',
    region: 'Adjara',
    city: 'Batumi',
    location: 'Old Batumi',
    difficulty: 'Medium',
    duration: '45 min',
    points: 120,
    image: '/images/city-view.jpg',
    description:
      'Walk through Old Batumi and find three details you would normally pass without noticing. Save your favorite one in a photo.',
  },
  8: {
    title: 'Taste something local at Kutaisi Green Bazaar',
    category: 'Food',
    region: 'Imereti',
    city: 'Kutaisi',
    location: 'Kutaisi Green Bazaar',
    difficulty: 'Medium',
    duration: '90 min',
    points: 160,
    image: '/images/community.jpg',
    description:
      'Visit the Green Bazaar, choose one product you have not tried before and ask the seller how local people usually enjoy it.',
  },
  9: {
    title: 'Spend an hour exploring Batonis Tsikhe',
    category: 'Culture',
    region: 'Kakheti',
    city: 'Telavi',
    location: 'Batonis Tsikhe',
    difficulty: 'Medium',
    duration: '2 hours',
    points: 180,
    image: '/images/city-view.jpg',
    description:
      'Take a slow walk around the museum and palace grounds. Find one fact about Kakheti that you did not know before.',
  },
  10: {
    title: 'Send a thank-you postcard from Mtskheta',
    category: 'Kindness',
    region: 'Mtskheta-Mtianeti',
    city: 'Mtskheta',
    location: 'Old Mtskheta',
    difficulty: 'Easy',
    duration: '30 min',
    points: 90,
    image: '/images/old-town.jpg',
    description:
      'Choose a postcard, write a real thank-you message to someone who helped you and send it before the day ends.',
  },
  11: {
    title: 'Plan a phone-free picnic in Gori',
    category: 'Social',
    region: 'Shida Kartli',
    city: 'Gori',
    location: 'Gori Central Park',
    difficulty: 'Easy',
    duration: '2 hours',
    points: 130,
    image: '/images/community.jpg',
    description:
      'Invite a few friends, bring one simple game and spend an hour together without endlessly checking your phones.',
  },
  12: {
    title: 'Walk the Kobuleti seaside at sunset',
    category: 'Outdoors',
    region: 'Adjara',
    city: 'Kobuleti',
    location: 'Kobuleti seaside',
    difficulty: 'Hard',
    duration: '60 min',
    points: 200,
    image: '/images/park.jpg',
    description:
      'Take a longer walk along the seaside, keep a comfortable pace and watch the light change near sunset.',
  },
  13: {
    title: 'Do one helpful thing for someone in Zugdidi',
    category: 'Kindness',
    region: 'Samegrelo-Zemo Svaneti',
    city: 'Zugdidi',
    location: 'Zugdidi city center',
    difficulty: 'Easy',
    duration: '10 min',
    points: 60,
    image: '/images/old-town.jpg',
    description:
      'Notice a small problem you can solve for another person and help without expecting anything in return.',
  },
  18: {
    title: 'Sketch an old balcony in Ozurgeti',
    category: 'Creative',
    region: 'Guria',
    city: 'Ozurgeti',
    location: 'Ozurgeti city center',
    difficulty: 'Easy',
    duration: '45 min',
    points: 100,
    image: '/images/street-art.jpg',
    description:
      'Take a notebook outside and make a quick sketch inspired by a balcony, gate or window that catches your eye.',
  },
  20: {
    title: 'Cook lobiani with a friend in Racha',
    category: 'Food',
    region: 'Racha-Lechkhumi and Kvemo Svaneti',
    city: 'Ambrolauri',
    location: 'A home kitchen in Ambrolauri',
    difficulty: 'Medium',
    duration: '2 hours',
    points: 170,
    image: '/images/community.jpg',
    description:
      'Choose a simple lobiani recipe, split the jobs with a friend and enjoy what you make together.',
  },
  22: {
    title: 'Take a slow walk through Borjomi park',
    category: 'Outdoors',
    region: 'Samtskhe-Javakheti',
    city: 'Borjomi',
    location: 'Borjomi Central Park',
    difficulty: 'Medium',
    duration: '2 hours',
    points: 220,
    image: '/images/park.jpg',
    description:
      'Take a proper walk through the park. Notice three small details and photograph your favorite one.',
  },
  23: {
    title: 'Learn one Svan tradition in Mestia',
    category: 'Culture',
    region: 'Samegrelo-Zemo Svaneti',
    city: 'Mestia',
    location: 'Seti Square and nearby streets',
    difficulty: 'Medium',
    duration: '90 min',
    points: 190,
    image: '/images/city-view.jpg',
    description:
      'Visit a local museum or speak with a local guide. Write down one Svan tradition you learned about.',
  },
  28: {
    title: 'Photograph Rustavi through geometric shapes',
    category: 'Creative',
    region: 'Kvemo Kartli',
    city: 'Rustavi',
    location: 'Rustavi Central Park',
    difficulty: 'Medium',
    duration: '60 min',
    points: 140,
    image: '/images/street-art.jpg',
    description:
      'Look for circles, lines and repeating patterns around the city. Build a small five-photo collection.',
  },
  29: {
    title: 'Follow one color through Sighnaghi',
    category: 'Creative',
    region: 'Kakheti',
    city: 'Sighnaghi',
    location: 'Sighnaghi old town',
    difficulty: 'Easy',
    duration: '60 min',
    points: 150,
    image: '/images/old-town.jpg',
    description:
      'Meet a friend for a photo walk. Pick one color and find it in five different streets or views.',
  },
}

const categorySteps = {
  Outdoors: [
    'Check the weather and choose a comfortable time.',
    'Take water and invite someone if you want company.',
    'Finish the activity and save one photo from the day.',
  ],
  Culture: [
    'Choose a place or activity that is new to you.',
    'Put your phone away for a while and pay attention.',
    'Write down one thing you learned or enjoyed.',
  ],
  Food: [
    'Choose what you want to make and prepare the ingredients.',
    'Share the work instead of doing everything alone.',
    'Taste the result together and keep your favorite photo.',
  ],
  Kindness: [
    'Choose one honest and useful action.',
    'Do it without expecting anything in return.',
    'Mark the quest complete and think about how it felt.',
  ],
  Creative: [
    'Take a few basic materials and find an inspiring place.',
    'Make something without worrying about perfection.',
    'Keep or share the result when you are finished.',
  ],
  Social: [
    'Choose a time that works for everyone.',
    'Keep the plan simple so it actually happens.',
    'Enjoy the activity and mark the quest complete together.',
  ],
}

export const getStepsForCategory = (category) =>
  categorySteps[category] || [
    'Choose a good time and prepare what you need.',
    'Complete the challenge at your own pace.',
    'Save a memory and mark the quest complete.',
  ]

export const curatedQuestIds = Object.keys(questDetails).map(Number)

export const normalizeQuest = (todo) => {
  const details = questDetails[todo.id]

  if (!details) {
    return null
  }

  return {
    id: String(todo.id),
    title: details.title || todo.todo,
    apiCompleted: todo.completed,
    userId: todo.userId,
    ...details,
    steps: getStepsForCategory(details.category),
  }
}

export const normalizeQuestList = (todos = []) =>
  todos.map(normalizeQuest).filter(Boolean)

export const getCategoryNames = () => [
  'All',
  ...categories.map(({ name }) => name),
]
