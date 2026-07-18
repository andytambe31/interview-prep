// Guidance for résumé "dive deep" preparation. Baseline content — enriched
// from research. Amazon interviewers probe every project on your résumé, so the
// goal is to be able to go 2–3 layers deep on each one.

export const resumeIntro =
  'Amazon interviewers “Dive Deep” on your résumé — expect follow-ups like “What exactly did you build?”, “Why that approach and not X?”, “What was the metric?”, and “What would you do differently?”. Prepare each project so you can go two or three layers deep without hesitating.'

// The checklist to be able to answer cold for every project/bullet.
export const bulletChecklist = [
  { key: 'problem', label: 'The problem', hint: 'What were you actually solving, and why did it matter?' },
  { key: 'role', label: 'Your specific role', hint: 'What did YOU do vs. the team? Use “I”.' },
  { key: 'tech', label: 'Tech & tradeoffs', hint: 'Stack, architecture, key decisions — and why you chose them over alternatives.' },
  { key: 'hardest', label: 'The hardest part', hint: 'The trickiest bug/decision and how you worked through it.' },
  { key: 'impact', label: 'Impact (quantified)', hint: 'Numbers: users, latency, %, time/money saved, scale, rank.' },
  { key: 'improve', label: 'What you’d change', hint: 'With hindsight or more time, what would you do differently?' },
]

export const commonResumeQuestions = [
  'Walk me through this project — what did you build and why?',
  'What was your specific contribution versus your teammates’?',
  'Why did you choose this technology/approach over the alternatives?',
  'What was the hardest technical problem you hit, and how did you solve it?',
  'What was the measurable impact? How do you know?',
  'What would you do differently if you started over?',
  'How did you test it / how did you know it worked?',
  'What did you learn from this?',
]

export const resumeRedFlags = [
  'Buzzwords you can’t explain when asked to go one level deeper.',
  'Claiming “we” did something but being unable to say what YOU did.',
  'Impact with no numbers, or numbers you can’t justify.',
  'Not knowing why you chose a technology over an obvious alternative.',
  'Listing a skill/tool on the résumé you can’t actually discuss.',
]
