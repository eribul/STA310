import type { Chapter } from '../types'

/**
 * Chapter 9 - Interval-censored survival data (Collett, 4th ed.).
 * Interval censoring, current status data, Turnbull's NPMLE and Turnbull
 * intervals, and semi-parametric and parametric models for such data.
 */
export const chapter09: Chapter = {
  number: 9,
  slug: 'interval-censored-data',
  title: 'Interval-censored survival data',
  summary:
    'Data where the event time is only known to lie in an interval: current status data, Turnbull intervals and the non-parametric maximum likelihood estimate, and models fitted from the full likelihood.',
  bookSections: '§9.1-9.4',
  flashcards: [
    {
      id: 'ch09-f01',
      front: 'What does the interval notation (L, U] mean for an event time?',
      back: 'The event time t is known only to satisfy L < t <= U: the interval is open at the lower limit and closed at the upper limit. If time is measured in days, (5, 10] means the event happened after day 5 but on or before day 10.',
      source: '§9.1',
    },
    {
      id: 'ch09-f02',
      front: 'How do exact, right-censored and left-censored times appear in the (L, U] notation?',
      back: 'Exact times have L = U = t. A right-censored time has L = t and U = infinity, so only t < T is known. A left-censored time has L = 0 and U = t, so the event is known to have occurred by time t. Right and left censoring are therefore special cases of interval censoring.',
      source: '§9.1',
    },
    {
      id: 'ch09-f03',
      front: 'What is current status data?',
      back: 'A special case with just one observation time per individual, at which it is only known whether the event has occurred. Individuals who already experienced the event have left-censored times and those who have not have right-censored times, so all observations are either left- or right-censored.',
      source: '§9.1.1',
    },
    {
      id: 'ch09-f04',
      front: 'Why can the Kaplan-Meier estimate not be used for interval-censored data?',
      back: 'Kaplan-Meier uses the exact event times and the risk sets at those times, neither of which is known when the event is only located in an interval. Ignoring the censoring, or imputing a single time such as the midpoint of each interval, can lead to biased inference.',
      source: '§9.1',
    },
    {
      id: 'ch09-f05',
      front: 'What are Turnbull intervals?',
      back: 'The set of intervals (a_j, b_j] on which the non-parametric maximum likelihood estimate of the survivor function changes value, obtained from the ordered unique interval limits. Outside them the estimate is constant; inside them it is undefined.',
      source: '§9.2',
    },
    {
      id: 'ch09-f06',
      front: 'What is Turnbull\'s estimate of the survivor function?',
      back: 'A non-parametric maximum likelihood estimate (NPMLE): S(t) = sum of theta_j over all Turnbull intervals with upper limit greater than t, where theta_j is the estimated probability that an event time falls in the jth Turnbull interval. It is a step function, constant between Turnbull intervals.',
      source: '§9.2',
    },
    {
      id: 'ch09-f07',
      front: 'How are the theta_j of Turnbull\'s estimate obtained?',
      back: 'By maximising the likelihood L = product over individuals of {S(l_i) - S(u_i)} subject to the theta_j summing to unity. The self-consistency equations are solved with an EM algorithm; alternatives include the iterative convex minorant (ICM) and EMICM algorithms, which can converge faster.',
      source: '§9.2',
    },
    {
      id: 'ch09-f08',
      front: 'Why are standard errors for Turnbull\'s estimate obtained by bootstrapping?',
      back: 'The number of unknown theta parameters grows with the sample size, so the usual likelihood-based theory for standard errors does not apply. Resampling schemes such as the bootstrap are therefore used to obtain interval estimates and standard errors.',
      source: '§9.2',
    },
    {
      id: 'ch09-f09',
      front: 'Why must a full likelihood be used to fit a proportional hazards model to interval-censored data?',
      back: 'With right-censored data the baseline hazard cancels out of the partial likelihood, but for interval-censored data the contribution is S(l_i) - S(u_i), which involves the baseline survivor function. The beta parameters and h_0(t) must therefore be estimated simultaneously from the full likelihood.',
      source: '§9.3',
    },
    {
      id: 'ch09-f10',
      front: 'Describe the semi-parametric Turnbull model.',
      back: 'A proportional hazards model in which the baseline survivor function is the non-parametric maximum likelihood estimate based on Turnbull intervals, so that the hazard, cumulative hazard and survivor functions are all constant between adjacent Turnbull intervals.',
      source: '§9.3.1',
    },
    {
      id: 'ch09-f11',
      front: 'Comment on the uniqueness of the estimated survivor function for interval-censored data.',
      back: 'The NPMLE is only determined up to the Turnbull intervals: it is constant between them and changes within them without being defined. With few individuals or wide intervals the estimate can change value only at a handful of times, so it is a coarse summary.',
      source: '§9.2',
    },
  ],
  questions: [
    {
      id: 'ch09-q01',
      prompt:
        'A patient is examined and found free of disease at 3 months, and a recurrence is detected at the 6-month examination. How is this event time recorded?',
      options: [
        'As an exact time of 6 months.',
        'As the interval (3, 6].',
        'As a right-censored time of 3 months.',
        'As the interval (0, 3].',
      ],
      correctIndex: 1,
      explanation:
        'The event is known to have happened after the negative examination at 3 months and on or before the positive examination at 6 months, so it is interval-censored in (3, 6].',
      source: '§9.1',
    },
    {
      id: 'ch09-q02',
      prompt: 'In the (L, U] notation, when is a survival time right-censored?',
      options: [
        'When L = 0 and U = t.',
        'When L = t and U is infinite.',
        'When L = U = t.',
        'When U is less than L.',
      ],
      correctIndex: 1,
      explanation:
        'Right censoring means the event time is only known to exceed the observed time t, which is written L = t and U = infinity. L = 0 with U = t describes left censoring and L = U = t an exact time.',
      source: '§9.1',
    },
    {
      id: 'ch09-q03',
      prompt: 'What are the Turnbull intervals?',
      options: [
        'The intervals between successive scheduled clinic visits.',
        'The intervals on which the estimated survivor function changes value, and inside which it is undefined.',
        'The intervals containing the maximum number of events.',
        'The confidence intervals for the estimated survivor function.',
      ],
      correctIndex: 1,
      explanation:
        'Turnbull intervals are derived from the ordered unique lower and upper limits of the observed intervals, not from the visit schedule. The NPMLE is constant between them and is not defined within them.',
      source: '§9.2',
    },
    {
      id: 'ch09-q04',
      prompt: 'Why are bootstrap methods commonly used with Turnbull\'s estimate?',
      options: [
        'Because the EM algorithm cannot produce point estimates.',
        'Because the number of unknown parameters increases with the sample size, so standard likelihood-based standard errors are not available.',
        'Because the estimate is a smooth continuous function.',
        'Because the likelihood function has a closed form solution.',
      ],
      correctIndex: 1,
      explanation:
        'The theta parameters grow with n, violating the usual asymptotics for standard errors. Resampling, such as the bootstrap, is therefore used to summarise the precision of the estimate.',
      source: '§9.2',
    },
    {
      id: 'ch09-q05',
      prompt:
        'What is the main obstacle to fitting a Cox proportional hazards model to interval-censored data?',
      options: [
        'The risk set cannot be defined.',
        'The partial likelihood is not available because the beta parameters and the baseline hazard must be estimated jointly from the full likelihood.',
        'Interval-censored data can only be analysed with turnbull intervals.',
        'Proportional hazards can never hold for interval-censored data.',
      ],
      correctIndex: 1,
      explanation:
        'The likelihood contribution is the difference of two survivor-function values, which depends on the baseline hazard and therefore does not cancel. A full likelihood is required, which makes fitting more computationally demanding.',
      source: '§9.3',
    },
    {
      id: 'ch09-q06',
      prompt: 'Which statement about current status data is correct?',
      options: [
        'Every individual has a precisely known event time.',
        'Each individual is examined once, so all times are either left- or right-censored.',
        'It is another name for administrative right censoring.',
        'It can only be analysed with the Kaplan-Meier estimate.',
      ],
      correctIndex: 1,
      explanation:
        'Current status data arise when there is a single observation time and only whether the event has occurred is recorded, giving left-censored times for those with the event and right-censored times for those without it.',
      source: '§9.1.1',
    },
  ],
}
