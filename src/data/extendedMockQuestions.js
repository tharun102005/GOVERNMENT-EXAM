// Extended Mock Questions Generator for 100-200 Question Government Exams (TNPSC, UPSC, SSC, Banking, RRB, Police, TET)

export const examSections = [
  { id: 'quant', name: 'Quantitative Aptitude', shortName: 'Quant', icon: '🧮' },
  { id: 'reasoning', name: 'Logical Reasoning', shortName: 'Reasoning', icon: '🧠' },
  { id: 'gk', name: 'General Knowledge & Polity', shortName: 'GK', icon: '🏛️' },
  { id: 'english', name: 'General English', shortName: 'English', icon: '📖' },
  { id: 'tamil', name: 'General Tamil / Regional', shortName: 'Tamil', icon: '🌺' },
];

const rawTemplates = [
  // Quant
  {
    section: 'quant',
    question: 'If 20% of a number is 60, what is 35% of the same number?',
    questionTa: 'ஒரு எண்ணின் 20% 60 எனில், அதே எண்ணின் 35% எவ்வளவு?',
    options: ['90', '100', '105', '110'],
    answer: 2,
    explanation: 'Let the number be X. 0.20 * X = 60 => X = 300. Thus, 35% of 300 = (35/100) * 300 = 105.',
    hasImage: false
  },
  {
    section: 'quant',
    question: 'A train 150m long is running at a speed of 54 km/hr. How long will it take to cross a platform 250m long?',
    questionTa: '150 மீ நீளமுள்ள ஒரு ரயில் மணிக்கு 54 கிமீ வேகத்தில் செல்கிறது. 250 மீ நீளமுள்ள ஒரு நடைமேடையை கடக்க எவ்வளவு காலம் ஆகும்?',
    options: ['20 seconds', '26.6 seconds', '30 seconds', '15 seconds'],
    answer: 1,
    explanation: 'Total distance = 150 + 250 = 400m. Speed = 54 * (5/18) = 15 m/s. Time = 400 / 15 = 26.67 seconds.',
    hasImage: false
  },
  {
    section: 'quant',
    question: 'A shopkeeper buys an item for Rs. 800 and sells it for Rs. 1000. What is his profit percentage?',
    questionTa: 'ஒரு கடைக்காரர் ஒரு பொருளை ரூ. 800க்கு வாங்கி ரூ. 1000க்கு விற்கிறார். லாப சதவீதம் என்ன?',
    options: ['20%', '25%', '15%', '30%'],
    answer: 1,
    explanation: 'Profit = Selling Price - Cost Price = 1000 - 800 = 200. Profit % = (200 / 800) * 100 = 25%.',
    hasImage: false
  },
  {
    section: 'quant',
    question: 'In the right triangle shown below, calculate the hypotenuse AC if AB = 12cm and BC = 5cm.',
    questionTa: 'கீழே உள்ள செங்கோண முக்கோணத்தில் AB = 12செமீ மற்றும் BC = 5செமீ எனில் கர்ணம் AC ஐக் கணக்கிடுக.',
    options: ['13 cm', '15 cm', '17 cm', '14 cm'],
    answer: 0,
    explanation: 'Using Pythagoras theorem: AC^2 = AB^2 + BC^2 = 12^2 + 5^2 = 144 + 25 = 169 => AC = 13 cm.',
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Figure 1: Right-angled Triangle ABC'
  },
  {
    section: 'quant',
    question: 'If A can complete a work in 10 days and B can do it in 15 days, how many days will they take working together?',
    questionTa: 'A ஒரு வேலையை 10 நாட்களில் செய்ய முடியும், B அதை 15 நாட்களில் செய்ய முடியும் எனில், இருவரும் சேர்ந்து செய்ய எத்தனை நாட்கள் ஆகும்?',
    options: ['5 days', '6 days', '7.5 days', '8 days'],
    answer: 1,
    explanation: 'A\'s 1-day work = 1/10, B\'s 1-day work = 1/15. Together = 1/10 + 1/15 = 5/30 = 1/6. Total time = 6 days.',
    hasImage: false
  },

  // Reasoning
  {
    section: 'reasoning',
    question: 'Find the missing number in the sequence: 2, 6, 12, 20, 30, ?',
    questionTa: 'தொடரில் விடுபட்ட எண்ணைக் கண்டறியவும்: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '36'],
    answer: 1,
    explanation: 'Differences are 4, 6, 8, 10. Next difference should be 12. 30 + 12 = 42. (Or n*(n+1) for n=1..6).',
    hasImage: false
  },
  {
    section: 'reasoning',
    question: 'If "GOAT" is coded as "HPBU", how is "FROG" coded in the same language?',
    questionTa: '"GOAT" என்பது "HPBU" என எழுதப்பட்டால், "FROG" எவ்வாறு எழுதப்படும்?',
    options: ['GSPH', 'GSOH', 'GTPH', 'EQNF'],
    answer: 0,
    explanation: 'Each letter is shifted by +1: F->G, R->S, O->P, G->H => GSPH.',
    hasImage: false
  },
  {
    section: 'reasoning',
    question: 'Pointing to a photograph, Ramesh said, "He is the son of the only daughter of my mother." How is Ramesh related to the person in photograph?',
    questionTa: 'ஒரு புகைப்படத்தைச் சுட்டிக்காட்டி ரமேஷ் கூறுகிறார், "இவர் என் அம்மாவின் ஒரே மகளின் மகன்." ரமேஷ் அந்த நபருக்கு என்ன உறவு?',
    options: ['Father', 'Maternal Uncle', 'Brother', 'Grandfather'],
    answer: 1,
    explanation: 'Ramesh\'s mother\'s only daughter is Ramesh\'s sister. Her son is Ramesh\'s nephew, so Ramesh is his Maternal Uncle (Thai Maman).',
    hasImage: false
  },
  {
    section: 'reasoning',
    question: 'Examine the Venn Diagram below. Which region represents students who play both Cricket and Football but NOT Badminton?',
    questionTa: 'கீழே உள்ள வென் வரைபடத்தை ஆராய்க. கிரிக்கெட் மற்றும் கால்பந்து இரண்டும் விளையாடும் ஆனால் பேட்மிண்டன் விளையாடாத மாணவர்களைக் குறிக்கும் பகுதி எது?',
    options: ['Region B', 'Region D', 'Region E', 'Region G'],
    answer: 0,
    explanation: 'Region B represents the intersection of Cricket and Football circles excluding Badminton.',
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Venn Diagram Analysis'
  },

  // GK & Polity
  {
    section: 'gk',
    question: 'Who is known as the "Father of the Indian Constitution"?',
    questionTa: 'இந்திய அரசியலமைப்பின் தந்தை என்று அழைக்கப்படுபவர் யார்?',
    options: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'Dr. B.R. Ambedkar', 'Sardar Vallabhbhai Patel'],
    answer: 2,
    explanation: 'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee of the Constituent Assembly.',
    hasImage: false
  },
  {
    section: 'gk',
    question: 'Which Article of the Constitution of India abolishes Untouchability?',
    questionTa: 'இந்திய அரசியலமைப்பின் எந்தப் பிரிவு தீண்டாமையை ஒழிக்கிறது?',
    options: ['Article 14', 'Article 17', 'Article 21', 'Article 32'],
    answer: 1,
    explanation: 'Article 17 explicitly abolishes untouchability and forbids its practice in any form.',
    hasImage: false
  },
  {
    section: 'gk',
    question: 'Which river is known as the "Dakshin Ganga" or "Ganga of the South"?',
    questionTa: 'தென் கங்கை என்று அழைக்கப்படும் நதி எது?',
    options: ['Kaveri', 'Godavari', 'Krishna', 'Mahanadi'],
    answer: 1,
    explanation: 'Godavari is the longest peninsular river system in India and is called Dakshin Ganga.',
    hasImage: false
  },
  {
    section: 'gk',
    question: 'The Panchayati Raj system was first constitutionalized under which Constitutional Amendment Act?',
    questionTa: 'பஞ்சாயத்து ராஜ் முறை எந்த அரசியலமைப்புத் திருத்தச் சட்டத்தின் கீழ் முதன்முதலில் சட்டப்பூர்வமாக்கப்பட்டது?',
    options: ['42nd Amendment', '44th Amendment', '73rd Amendment', '86th Amendment'],
    answer: 2,
    explanation: 'The 73rd Constitutional Amendment Act, 1992 added Part IX and Schedule 11 to the Constitution for Panchayati Raj.',
    hasImage: false
  },

  // English
  {
    section: 'english',
    question: 'Identify the synonym for the underlined word: "The minister gave a very **lucid** explanation of the new tax policy."',
    questionTa: '"lucid" என்ற சொல்லின் சரியான பொருளைத் தேர்ந்தெடுக்கவும்.',
    options: ['Vague', 'Clear and understandable', 'Complex', 'Ambiguous'],
    answer: 1,
    explanation: 'Lucid means expressed clearly or easy to understand.',
    hasImage: false
  },
  {
    section: 'english',
    question: 'Choose the correct option to fill in the blank: "Neither of the two candidates _____ qualified for the post."',
    questionTa: 'சரியான வினையைத் தேர்ந்தெடுக்கவும்: "Neither of the two candidates _____ qualified for the post."',
    options: ['are', 'is', 'were', 'have been'],
    answer: 1,
    explanation: '"Neither of" takes a singular verb ("is").',
    hasImage: false
  },

  // Tamil & TNPSC Specific
  {
    section: 'tamil',
    question: 'திராவிட மொழிகளின் ஒப்பிலக்கணம் என்ற நூலை எழுதியவர் யார்?',
    questionTa: 'திராவிட மொழிகளின் ஒப்பிலக்கணம் என்ற நூலை எழுதியவர் யார்?',
    options: ['கால்டுவெல் (Robert Caldwell)', 'ஜி.யு.போப் (G.U. Pope)', 'வீரமாமுனிவர்', 'ஜி.டி.நாயுடு'],
    answer: 0,
    explanation: '1856 ஆம் ஆண்டு ராபர்ட் கால்டுவெல் திராவிட மொழிகளின் ஒப்பிலக்கணம் என்ற நூலை வெளியிட்டார்.',
    hasImage: false
  },
  {
    section: 'tamil',
    question: '"செம்மொழித் தமிழ்" என்ற தகுதியைத் தமிழ் மொழி எந்த ஆண்டில் பெற்றது?',
    questionTa: '"செம்மொழித் தமிழ்" என்ற தகுதியைத் தமிழ் மொழி எந்த ஆண்டில் பெற்றது?',
    options: ['2001', '2004', '2008', '2010'],
    answer: 1,
    explanation: 'தமிழ் மொழி 2004 அக்டோபரில் இந்திய அரசால் செம்மொழியாக அறிவிக்கப்பட்டது.',
    hasImage: false
  },
  {
    section: 'gk',
    question: 'Who was the first Chief Minister of Tamil Nadu after independence?',
    questionTa: 'சுதந்திரத்திற்குப் பிறகு தமிழ்நாட்டின் முதல் முதலமைச்சர் யார்?',
    options: ['K. Kamaraj', 'O. P. Ramaswamy Reddiyar', 'C. N. Annadurai', 'C. Rajagopalachari'],
    answer: 1,
    explanation: 'O. P. Ramaswamy Reddiyar was the Premier of Madras Presidency from 1947 to 1949 after independence.',
    hasImage: false
  },
  {
    section: 'gk',
    question: 'In which year was the Madras State renamed as Tamil Nadu?',
    questionTa: 'மெட்ராஸ் மாநிலம் தமிழ்நாடு என பெயர் மாற்றப்பட்ட ஆண்டு எது?',
    options: ['1956', '1967', '1969', '1972'],
    answer: 2,
    explanation: 'Madras State was renamed as Tamil Nadu on January 14, 1969, under the leadership of C.N. Annadurai.',
    hasImage: false
  }
];

export function generateExamQuestions(totalCount = 100) {
  const questions = [];
  
  for (let i = 0; i < totalCount; i++) {
    const template = rawTemplates[i % rawTemplates.length];
    const sectionIndex = i % examSections.length;
    const currentSection = examSections[sectionIndex];

    // Generate slight variation for duplicated questions so each question feels unique
    const multiplier = Math.floor(i / rawTemplates.length) + 1;
    let questionText = template.question;
    let questionTa = template.questionTa;
    let options = [...template.options];
    let explanation = template.explanation;

    if (multiplier > 1 && template.section === 'quant') {
      if (template.question.includes('20% of a number is 60')) {
        const val = 60 * multiplier;
        questionText = `Q${i + 1}: If 20% of a number is ${val}, what is 35% of the same number?`;
        questionTa = `Q${i + 1}: ஒரு எண்ணின் 20% ${val} எனில், அதே எண்ணின் 35% எவ்வளவு?`;
        const ansVal = (val / 20) * 35;
        options = [`${ansVal - 15}`, `${ansVal - 5}`, `${ansVal}`, `${ansVal + 10}`];
        explanation = `20% = ${val}, so 100% = ${val * 5}. 35% of ${val * 5} = ${ansVal}.`;
      } else if (template.question.includes('train')) {
        const speed = 54 + (multiplier * 18);
        questionText = `Q${i + 1}: A train running at speed of ${speed} km/hr crosses a 200m bridge in 20 sec. Find length of train.`;
        questionTa = `Q${i + 1}: ${speed} கிமீ வேகத்தில் செல்லும் ரயில் 20 வினாடிகளில் 200மீ பாலத்தைக் கடக்கிறது. ரயிலின் நீளம் காண்க.`;
        const totalDist = (speed * 5/18) * 20;
        const trainLen = totalDist - 200;
        options = [`${trainLen - 20}m`, `${trainLen}m`, `${trainLen + 30}m`, `${trainLen + 50}m`].sort();
        explanation = `Total Distance = Speed * Time = (${speed}*5/18) * 20 = ${totalDist}m. Train Length = ${totalDist} - 200 = ${trainLen}m.`;
      }
    }

    questions.push({
      id: i + 1,
      sectionId: currentSection.id,
      sectionName: currentSection.name,
      question: questionText,
      questionTa: questionTa,
      options: options,
      answer: template.answer,
      explanation: explanation,
      hasImage: template.hasImage && (i % 7 === 3),
      imageUrl: template.imageUrl || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
      imageCaption: template.imageCaption || `Diagram Reference for Question #${i + 1}`
    });
  }

  return questions;
}

export function generateSubjectQuiz(subjectName = 'Quantitative Aptitude', totalCount = 20) {
  const nameLower = subjectName.toLowerCase();
  let targetSection = 'quant';
  if (nameLower.includes('reasoning')) targetSection = 'reasoning';
  else if (nameLower.includes('knowledge') || nameLower.includes('gk')) targetSection = 'gk';
  else if (nameLower.includes('english')) targetSection = 'english';
  else if (nameLower.includes('tamil')) targetSection = 'tamil';
  else if (nameLower.includes('computer')) targetSection = 'quant'; // fallback

  const filtered = rawTemplates.filter(t => t.section === targetSection);
  const templatesToUse = filtered.length > 0 ? filtered : rawTemplates;

  const questions = [];
  for (let i = 0; i < totalCount; i++) {
    const template = templatesToUse[i % templatesToUse.length];
    const multiplier = Math.floor(i / templatesToUse.length) + 1;
    let questionText = template.question;
    let questionTa = template.questionTa;
    let options = [...template.options];
    let explanation = template.explanation;

    if (multiplier > 1 && targetSection === 'quant') {
      const val = 40 + (i * 15);
      questionText = `Q${i + 1}: If 25% of a number is ${val}, what is 60% of the same number?`;
      questionTa = `Q${i + 1}: ஒரு எண்ணின் 25% ${val} எனில், அதே எண்ணின் 60% எவ்வளவு?`;
      const num = val * 4;
      const ansVal = num * 0.6;
      options = [`${ansVal - 10}`, `${ansVal}`, `${ansVal + 15}`, `${ansVal + 25}`];
      explanation = `25% = ${val} => 100% = ${num}. 60% of ${num} = ${ansVal}.`;
    }

    questions.push({
      id: i + 1,
      sectionId: targetSection,
      sectionName: subjectName,
      question: questionText,
      questionTa: questionTa,
      options: options,
      answer: template.answer,
      explanation: explanation,
      hasImage: template.hasImage && (i % 5 === 2),
      imageUrl: template.imageUrl || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
      imageCaption: template.imageCaption || `Diagram Reference for Question #${i + 1}`
    });
  }

  return questions;
}

