import type { Chapter } from '../types'

/**
 * Chapter 1 - Survival analysis (Collett, 4th ed.).
 * Core concepts: censoring, the survivor / hazard / cumulative hazard
 * functions, and the assumptions needed before any survival method applies.
 */
export const chapter01: Chapter = {
  number: 1,
  slug: 'survival-analysis',
  title: 'Survival analysis',
  summary:
    'Time-to-event data and why standard methods fail: censoring, study time vs patient time, and the survivor, hazard and cumulative hazard functions.',
  bookSections: '§1.1-1.4',
  flashcards: [
    {
      id: 'ch01-f01',
      front: 'What is survival analysis?',
      back: 'The analysis of data in the form of times from a well-defined time origin until the occurrence of a particular event or end point. The event need not be death (time-to-event data), but the methods are the same.',
      source: '§1.1',
    },
    {
      id: 'ch01-f02',
      front: 'What is a censored survival time?',
      back: 'A survival time is censored when the end point of interest has not been observed. The individual is known only to have survived up to the censoring time c, so the true survival time t is greater than c.',
      source: '§1.2.1',
    },
    {
      id: 'ch01-f03',
      front: 'What is right censoring, and when is it administrative?',
      back: 'Right censoring occurs when it is only known that survival exceeds the last observed time (censoring lies to the right of the observed time). Administrative censoring is right censoring caused by the fixed end of the study observation period.',
      source: '§1.2.1',
    },
    {
      id: 'ch01-f04',
      front: 'Distinguish left censoring from interval censoring.',
      back: 'Left censoring: the actual event time is less than the observed time (e.g. recurrence already present at the first 3-month visit). Interval censoring: the event is known to have occurred within an interval (e.g. disease-free at 3 months, recurrence found at 6 months).',
      source: '§1.2.1',
    },
    {
      id: 'ch01-f05',
      front: 'What is independent (non-informative) censoring and why is it needed?',
      back: 'The true survival time t does not depend on the mechanism that censors the individual at c < t. Equivalently, a censored individual is representative of everyone still at risk at that time. The methods in the book rely on this assumption; dependent (informative) censoring is handled only in Chapter 14.',
      source: '§1.2.2',
    },
    {
      id: 'ch01-f06',
      front: 'Distinguish study time from patient time.',
      back: 'Study time is the calendar period during which an individual is in the study. Patient time is that period measured from the individual\'s own time origin. Because patients are recruited over months or years, the two are not the same, and survival times are computed in patient time.',
      source: '§1.2.3',
    },
    {
      id: 'ch01-f07',
      front: 'Define the survivor function S(t).',
      back: 'S(t) = P(T >= t) = 1 - F(t), the probability that the survival time is at least t. It is a non-increasing step function for observed data, equal to 1 before the first event time.',
      source: '§1.4.1',
    },
    {
      id: 'ch01-f08',
      front: 'Define the hazard function h(t).',
      back: 'The instantaneous event rate at time t, conditional on the event not having occurred before t. It is a rate, not a probability: h(t) = lim_{dt->0} P(t <= T < t+dt | T >= t) / dt. It can exceed 1.',
      source: '§1.4.2',
    },
    {
      id: 'ch01-f09',
      front: 'Give the relationship between the hazard and the survivor function.',
      back: 'h(t) = f(t)/S(t) = -d/dt {log S(t)}, and conversely S(t) = exp{-H(t)}. From any one of f(t), S(t) and h(t) the other two can be determined.',
      source: '§1.4.2-1.4.3',
    },
    {
      id: 'ch01-f10',
      front: 'Define the cumulative hazard function H(t).',
      back: 'H(t) = integral from 0 to t of h(u) du = -log S(t). It is the cumulative risk of an event by time t, and can be interpreted as the expected number of events in (0, t) when events can repeat.',
      source: '§1.4.3',
    },
    {
      id: 'ch01-f11',
      front: 'Can the cumulative hazard exceed 1, and what does that mean?',
      back: 'Yes. H(t) >= 1 exactly when S(t) <= e^-1 = 0.37, i.e. more than one event is expected in (0, t). Interpreting H(t) as an expected number of events only makes sense when the event can recur (infection, migraine); for death it is a formal device.',
      source: '§1.4.3',
    },
    {
      id: 'ch01-f12',
      front: 'Why are standard statistical procedures inappropriate for survival data?',
      back: 'Two reasons: survival times are generally positively skewed (so a normal model is unreasonable), and survival times are frequently censored, so the observed value is often only a lower bound.',
      source: '§1.2',
    },
  ],
  questions: [
    {
      id: 'ch01-q01',
      prompt: 'Which statement about the hazard function h(t) is correct?',
      options: [
        'It is the probability that an individual dies at time t.',
        'It is the instantaneous rate of the event at t, conditional on survival up to t, and can exceed 1.',
        'It is the probability of surviving beyond t.',
        'It must be a non-increasing function of t.',
      ],
      correctIndex: 1,
      explanation:
        'The hazard is a conditional rate per unit time (see Equation 1.3), not a probability, so it is unbounded above. S(t) is the probability of surviving beyond t.',
      source: '§1.4.2',
    },
    {
      id: 'ch01-q02',
      prompt:
        'A patient with a bone tumour is free of recurrence at the 3-month check-up but is found to have recurred at the 6-month check-up. The recurrence time is:',
      options: [
        'right-censored',
        'left-censored',
        'interval-censored',
        'not censored at all',
      ],
      correctIndex: 2,
      explanation:
        'The event is known to lie between 3 and 6 months, which is interval censoring. Left censoring would mean the event happened before the first observation; right censoring would mean it is only known not to have happened yet.',
      source: '§1.2.1',
    },
    {
      id: 'ch01-q03',
      prompt: 'Why is the assumption of independent censoring essential?',
      options: [
        'It guarantees that the censoring times are normally distributed.',
        'It ensures that censored individuals are representative of those still at risk, so the risk sets are unbiased.',
        'It removes the need for a baseline hazard function.',
        'It makes the survival times symmetric.',
      ],
      correctIndex: 1,
      explanation:
        'Under independent (non-informative) censoring, an individual censored at time c is representative of all individuals with the same prognosis who survived to c. If censoring is informative (e.g. treatment withdrawn because the patient deteriorates), naive risk sets are biased.',
      source: '§1.2.2',
    },
    {
      id: 'ch01-q04',
      prompt: 'Which pair of statements correctly relates the three central functions?',
      options: [
        'S(t) = 1 - H(t) and h(t) = f(t) * S(t)',
        'H(t) = -log S(t) and h(t) = f(t)/S(t)',
        'S(t) = exp{H(t)} and h(t) = S(t)/f(t)',
        'H(t) = log S(t) and h(t) = -f(t)/S(t)',
      ],
      correctIndex: 1,
      explanation:
        'From Section 1.4: H(t) = -log S(t), equivalently S(t) = exp{-H(t)}, and h(t) = f(t)/S(t). Knowing any one of f, S or h determines the other two.',
      source: '§1.4.2-1.4.3',
    },
    {
      id: 'ch01-q05',
      prompt:
        'For a single sample no assumption is made about the shape of S(t). If the estimated cumulative hazard at t = 15 months is 2.20, what is the corresponding estimated survivor function, and how should H(t) > 1 be read?',
      options: [
        'S(15) = 0.89; a cumulative hazard above 1 is impossible for a valid estimate.',
        'S(15) = 2.20; H(t) is the survivor function on the log scale.',
        'S(15) = 0.11; a cumulative hazard above 1 simply reflects that more than one event is expected in (0, t) when events can recur.',
        'S(15) = 1 - 2.20 = -1.20; the estimate is invalid.',
      ],
      correctIndex: 2,
      explanation:
        'S(t) = exp{-H(t)} = exp(-2.20) = 0.11. The cumulative hazard may exceed unity; it corresponds to S(t) <= e^-1 = 0.37, i.e. more than one event expected in (0, t) under the repeatable-event interpretation.',
      source: '§1.4.3',
    },
    {
      id: 'ch01-q06',
      prompt:
        'Patients enter a trial over three years and are analysed two years after the last patient is recruited. Which statement is correct?',
      options: [
        'All patients have the same patient time because study time is fixed.',
        'Patients recruited earlier can accumulate more patient time, so calendar time and patient time must not be confused.',
        'Study time is measured from each patient\'s own time origin.',
        'Administrative censoring occurs only when a patient is lost to follow-up.',
      ],
      correctIndex: 1,
      explanation:
        'Patient time runs from each individual\'s own time origin, so early recruits can be followed longer. Study time is the calendar period in the study. Administrative censoring happens when the observation period ends, not only when a patient is lost.',
      source: '§1.2.3',
    },
  ],
}
