import { SymptomCard, ConsultationRecord, Article, CareStep, SeverityLevel, DurationLevel } from './types';

export const SYMPTOMS_DATA: SymptomCard[] = [
  { id: 'fever', title: 'Fever', description: 'High temperature', type: 'flu', icon: '🌡️', category: 'general' },
  { id: 'cough', title: 'Cough', description: 'Dry or wet cough', type: 'cold', icon: '😷', category: 'chest' },
  { id: 'throat', title: 'Sore Throat', description: 'Pain when swallowing', type: 'cold', icon: '🤒', category: 'throat' },
  { id: 'breath', title: 'Breathing', description: 'Difficulty breathing', type: 'warning', icon: '🆘', category: 'chest' },
  { id: 'fatigue', title: 'Fatigue', description: 'Extreme tiredness', type: 'flu', icon: '😴', category: 'general' },
  { id: 'headache', title: 'Headache', description: 'Head pain', type: 'flu', icon: '🤕', category: 'head' },
];

export const CONDITION_MAP: Record<string, { type: string; severity: SeverityLevel; advice: string }> = {
  'breath': {
    type: 'Emergency Alert',
    severity: 'high',
    advice: 'Breathing difficulties require immediate medical attention. Please visit the university clinic or emergency services now.'
  },
  'fever,cough,fatigue': {
    type: 'Flu Pattern',
    severity: 'moderate',
    advice: 'Your symptoms align with common flu. Rest, hydration, and monitoring are crucial for the next 48-72 hours.'
  },
  'cough,throat': {
    type: 'Common Cold',
    severity: 'mild',
    advice: 'Classic cold symptoms detected. Focus on rest, warm fluids, and throat care.'
  }
};

export const CARE_TIMELINE: Record<DurationLevel, { period: string; focus: string[] }> = {
  'short': {
    period: '24-48 hours',
    focus: ['Immediate rest', 'High fluid intake', 'Monitor temperature']
  },
  'medium': {
    period: '3-5 days',
    focus: ['Structured rest periods', 'Balanced nutrition', 'Gradual activity']
  },
  'long': {
    period: '7+ days',
    focus: ['Medical consultation', 'Extended recovery', 'Follow-up assessment']
  }
};

export const GUIDANCE_DATA: Record<SeverityLevel, { now: string[]; avoid: string[]; meds: string[] }> = {
  'mild': {
    now: [
      'Drink 2-3 liters of water or herbal tea daily',
      'Sleep 8-10 hours per night',
      'Eat warm, nutritious soups and soft foods'
    ],
    avoid: [
      'Strenuous physical activity',
      'Cold beverages and ice cream',
      'Crowded spaces to prevent spread'
    ],
    meds: [
      'Vitamin C supplements (500-1000mg)',
      'Throat lozenges for comfort',
      'Paracetamol for mild discomfort (as directed)'
    ]
  },
  'moderate': {
    now: [
      'Maintain strict hydration (3L+ fluids)',
      'Complete bed rest for 48 hours minimum',
      'Monitor temperature every 4 hours',
      'Use humidifier if available'
    ],
    avoid: [
      'Any physical exertion',
      'Alcohol and caffeine',
      'Self-medication without consultation'
    ],
    meds: [
      'Paracetamol or ibuprofen (follow dosage)',
      'Cough suppressants if dry cough',
      'Consult pharmacy for combination remedies'
    ]
  },
  'high': {
    now: [
      '⚠️ SEEK IMMEDIATE MEDICAL ATTENTION',
      'Do not delay - visit clinic or ER',
      'Have someone accompany you',
      'Bring your student ID and health records'
    ],
    avoid: [
      'Attempting to self-treat',
      'Driving yourself to clinic',
      'Ignoring warning signs'
    ],
    meds: [
      'Only take prescribed medications',
      'Follow doctor\'s instructions exactly',
      'Report all symptoms to medical staff'
    ]
  }
};

export const QUICK_REPLIES = [
  'How long to recover?',
  'Can I attend class?',
  'What to eat?',
  'When see doctor?'
];

export const MOCK_HISTORY: ConsultationRecord[] = [
  {
    id: 'c1',
    date: new Date(2024, 11, 20),
    summary: 'Mild cold symptoms, hydration protocol initiated.',
    symptoms: ['cough', 'throat'],
    severity: 'mild',
    syncStatus: 'synced',
    serverId: 'SRV-2024-1220-001'
  },
  {
    id: 'c2',
    date: new Date(2024, 11, 15),
    summary: 'Routine wellness check, preventive guidance provided.',
    symptoms: [],
    severity: 'mild',
    syncStatus: 'synced',
    serverId: 'SRV-2024-1215-002'
  }
];

export const HEALTH_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Understanding Cold vs Flu',
    preview: 'Learn to identify key differences...',
    content: `Cold and flu are both respiratory illnesses, but they are caused by different viruses.

Cold symptoms develop gradually and are typically milder. You might experience a runny nose, sore throat, and mild cough. Most colds resolve within 7-10 days.

Flu symptoms come on suddenly and are more severe. High fever, body aches, extreme fatigue, and dry cough are common. Flu can last 1-2 weeks.

When to worry: If fever exceeds 103°F (39.5°C), breathing becomes difficult, or symptoms worsen after initial improvement, seek medical care immediately.`,
    category: 'Prevention',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800',
    icon: '🦠'
  },
  {
    id: 'a2',
    title: 'Hydration During Illness',
    preview: 'Why water is your best medicine...',
    content: `Proper hydration is crucial when you're sick. Here's why:

Your body uses more fluids when fighting infection. Fever, sweating, and respiratory symptoms all increase fluid loss. Aim for 2-3 liters daily.

Best fluids: Water, herbal teas, clear broths, and electrolyte solutions. Warm liquids can soothe throat pain and help loosen congestion.

Signs of dehydration: Dark urine, dizziness, dry mouth, or decreased urination. If you notice these, increase fluid intake immediately.`,
    category: 'Recovery',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
    icon: '💧'
  },
  {
    id: 'a3',
    title: 'Rest and Recovery Science',
    preview: 'The healing power of sleep...',
    content: `Sleep is when your body does its most important repair work. During illness, this becomes even more critical.

Your immune system releases proteins called cytokines during sleep. These proteins target infection and inflammation, effectively helping you heal.

Sleep recommendations: Aim for 8-10 hours per night when sick. Short naps (20-30 minutes) during the day can also help, but avoid long daytime sleep that disrupts nighttime rest.

Quality matters: Keep your room cool, dark, and quiet. Elevate your head slightly if you have congestion.`,
    category: 'Wellness',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800',
    icon: '😴'
  }
];

export const CARE_STEPS: CareStep[] = [
  {
    id: 's1',
    title: 'Hydration Protocol',
    instruction: 'Drink 250ml of water or herbal tea every 2 hours',
    icon: '💧',
    symptomIds: ['fever', 'cough', 'throat']
  },
  {
    id: 's2',
    title: 'Rest Cycle',
    instruction: 'Complete bed rest for first 24-48 hours',
    icon: '🛏️',
    symptomIds: ['fever', 'fatigue']
  },
  {
    id: 's3',
    title: 'Temperature Monitoring',
    instruction: 'Check temperature every 4 hours',
    icon: '🌡️',
    symptomIds: ['fever']
  },
  {
    id: 's4',
    title: 'Throat Care',
    instruction: 'Gargle with warm salt water 3x daily',
    icon: '🤒',
    symptomIds: ['throat']
  }
];
