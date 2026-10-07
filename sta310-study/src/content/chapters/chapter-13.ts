import type { Chapter } from '../types'

/**
 * Chapter 13 - Multiple events and event history modelling (Collett, 4th ed.).
 * Counting processes, recurrent events (AG, PWP, WLW models), multiple events
 * of different types, and multistate (event history) models.
 */
export const chapter13: Chapter = {
  number: 13,
  slug: 'multiple-events',
  title: 'Multiple events and event history modelling',
  summary:
    'Counting processes and the models built on them: Andersen-Gill, Prentice-Williams-Peterson and Wei-Lin-Weissfeld for recurrent and multiple events, plus multistate event history models.',
  bookSections: '§13.1-13.4',
  flashcards: [
    {
      id: 'ch13-f01',
      front: 'Define a counting process and the at-risk process.',
      back: 'N_i(t) counts the number of events experienced by the ith individual in (0, t]; it starts at 0 and increases in steps of one. Y_i(t) is the at-risk process, equal to 1 while the individual is at risk at time t and 0 otherwise. If Y_i(t) is known at time t-, the time immediately before t, it is a predictable process.',
      source: '§13.1',
    },
    {
      id: 'ch13-f02',
      front: 'What is the intensity of a counting process?',
      back: 'The rate at which events occur, conditional on the history of the process: lambda_i(t) = E{dN_i(t) | H(t-)} / dt, the expected number of events in unit time given the past. Its integral, the cumulative intensity Lambda_i(t), satisfies E{N_i(t)} = Lambda_i(t).',
      source: '§13.1',
    },
    {
      id: 'ch13-f03',
      front: 'Write the intensity for a Cox-type model with counting process data.',
      back: 'lambda_i(t) = Y_i(t) exp(beta x_i(t)) lambda_0(t). For ordinary survival data this reduces to lambda_i(t) = Y_i(t) h_i(t), so the intensity equals the hazard when the individual is at risk and is zero otherwise.',
      source: '§13.1.1, §13.1.2',
    },
    {
      id: 'ch13-f04',
      front: 'What is the martingale associated with a counting process?',
      back: 'M_i(t) = N_i(t) - Lambda_i(t), the observed number of events minus the cumulative expected number. It has zero mean for all t and is a martingale; it is the basis of the martingale residuals used in model checking.',
      source: '§13.1.1',
    },
    {
      id: 'ch13-f05',
      front: 'Why is the counting process formulation so useful?',
      back: 'It is a single framework that extends the Cox model to time-varying covariates, dependent censoring, recurrent events, multiple events per subject, correlated data, left truncation and multistate models, and it provides the asymptotic theory for the estimators and tests.',
      source: '§13.1.2',
    },
    {
      id: 'ch13-f06',
      front: 'Why is a robust variance-covariance matrix needed when modelling multiple events?',
      back: 'Event times within an individual are not independent, but the standard errors obtained from the usual likelihood theory assume independence and are therefore too small. A robust (sandwich) estimate of the variance-covariance matrix corrects this overstatement of precision.',
      source: '§13.1.4',
    },
    {
      id: 'ch13-f07',
      front: 'What are recurrent events, and what is the simplest way to analyse them?',
      back: 'Repeated occurrences of the same type of event within an individual: tumour recurrences, infections, seizures, migraines and so on. The simplest approach is to model the time to the first event with standard survival methods, but this discards the later events.',
      source: '§13.2',
    },
    {
      id: 'ch13-f08',
      front: 'State the Andersen-Gill (AG) model and its assumptions.',
      back: 'h_i(t) = Y_i(t) exp(beta x_i(t)) h_0(t): a single baseline hazard is shared by all recurrences and the recurrence times within an individual are assumed independent. The individual remains at risk after each event, so the risk set is simply everyone still under follow-up. It is therefore well suited to modelling the overall recurrence rate.',
      source: '§13.2.1',
    },
    {
      id: 'ch13-f09',
      front: 'How can within-subject dependence be handled in the AG model?',
      back: 'Either by including terms for the number of preceding events or the time from the origin and using a robust variance estimate, or, preferably, by adding a random subject effect (frailty): h_i(t) = Y_i(t) exp(beta x_i(t) + u_i) h_0(t) with u_i often assumed normal with zero mean and variance sigma_u^2.',
      source: '§13.2.1',
    },
    {
      id: 'ch13-f10',
      front: 'State the Prentice-Williams-Peterson (PWP) model and explain why it is called conditional.',
      back: 'h_ij(t) = Y_ij(t) exp(beta_j x_i(t)) h_0j(t): a separate stratum and baseline hazard is used for each recurrence number j. The risk set for the jth recurrence contains only individuals who have already experienced j - 1 recurrences, so the model for the jth event is conditional on the previous one. It is widely regarded as the most satisfactory model for general use with recurrent events.',
      source: '§13.2.2',
    },
    {
      id: 'ch13-f11',
      front: 'State the Wei-Lin-Weissfeld (WLW) model and the caveat attached to it.',
      back: 'h_ij(t) = Y_ij(t) exp(beta_j x_i(t)) h_0j(t), but now Y_ij(t) is unity until the jth event occurs and zero afterwards. The risk set at t consists of everyone still under follow-up in whom the jth event has not occurred, and the beta coefficients are estimated jointly from the times to all events. Because someone with one event counts as at risk of the third, fourth and later events, the coefficients are hard to interpret for recurrent events; the model is recommended only when times to distinct events from a common time origin are of interest.',
      source: '§13.3.1',
    },
    {
      id: 'ch13-f12',
      front: 'What are multiple events, as opposed to recurrent events?',
      back: 'In chronic disease an individual may experience several events of different types, each occurring at most once and in an order that varies between individuals: for liver disease, histological progression, varices, ascites, rising bilirubin, transplantation and death. Fitting separate models to each event time is possible but less efficient than the WLW model.',
      source: '§13.3',
    },
    {
      id: 'ch13-f13',
      front: 'What is an event history (multistate) model?',
      back: 'A model for a process in which an individual moves between states, with a transition (intensity) rate for each possible move: h_ijk(t) = Y_ijk(t) exp(beta_jk x_i) h_0jk(t), where Y_ijk(t) is one if individual i is in state j and at risk of moving to state k. A simple survival study is the two-state model alive to dead; a transplant study might have transplant, graft failure, retransplant and death.',
      source: '§13.4',
    },
  ],
  questions: [
    {
      id: 'ch13-q01',
      prompt: 'What is the intensity of a counting process?',
      options: [
        'The total number of events observed by time t.',
        'The expected number of events per unit time, conditional on the history of the process up to time t.',
        'The probability that an individual is still alive at time t.',
        'The cumulative hazard of the first event only.',
      ],
      correctIndex: 1,
      explanation:
        'The intensity lambda_i(t) = E{dN_i(t) | H(t-)}/dt is the conditional expected rate of events. Its integral over (0, t) is the expected number of events, and for ordinary survival data it equals Y_i(t) h_i(t).',
      source: '§13.1',
    },
    {
      id: 'ch13-q02',
      prompt: 'What distinguishes the Andersen-Gill model from the PWP model?',
      options: [
        'AG uses a separate baseline hazard for every recurrence, whereas PWP uses a single one.',
        'AG uses one baseline hazard shared by all recurrences and assumes independent recurrence times, whereas PWP stratifies by recurrence number so the risk set for the jth event contains only those who have had j - 1 previous events.',
        'AG can only be used for multiple events of different types.',
        'PWP does not allow covariates.',
      ],
      correctIndex: 1,
      explanation:
        'The AG model is the simplest, treating all recurrences as if they came from one common baseline intensity. The PWP model is a conditional model: it allows the intensity to change with each recurrence by using recurrence-specific strata and risk sets.',
      source: '§13.2.1, §13.2.2',
    },
    {
      id: 'ch13-q03',
      prompt: 'Why is the WLW model not recommended for recurrent events?',
      options: [
        'It cannot handle censoring.',
        'Its risk set definition means an individual who has had one recurrence is at risk of a third, fourth and later recurrence, which makes the coefficients hard to interpret.',
        'It does not permit a robust variance estimate.',
        'It assumes independent event times, which is too restrictive.',
      ],
      correctIndex: 1,
      explanation:
        'In the WLW model Y_ij(t) stays at one until the jth event occurs, so someone with a single event is treated as at risk of every higher-order event. This is inconsistent for recurrences, so the model is recommended only for distinct events measured from the time origin.',
      source: '§13.3.1',
    },
    {
      id: 'ch13-q04',
      prompt:
        'Why are robust standard errors needed when several events are observed per individual?',
      options: [
        'Because the model is no longer fitted by maximum likelihood.',
        'Because event times within an individual are correlated, so the usual model-based standard errors are too small.',
        'Because the number of events is unknown.',
        'Because the baseline hazard is unspecified.',
      ],
      correctIndex: 1,
      explanation:
        'Model-based standard errors assume independent observations. Correlated events within a subject violate this, so the standard errors understate uncertainty; a robust (sandwich) variance estimate corrects for it.',
      source: '§13.1.4',
    },
    {
      id: 'ch13-q05',
      prompt: 'In a multistate model, what does the quantity Y_ijk(t) represent?',
      options: [
        'The number of events experienced by individual i up to time t.',
        'An indicator that individual i is in state j and at risk of moving to state k at time t.',
        'The baseline intensity for the transition from j to k.',
        'The probability of ever entering state k.',
      ],
      correctIndex: 1,
      explanation:
        'The transition rate is h_ijk(t) = Y_ijk(t) exp(beta_jk x_i) h_0jk(t). The indicator picks out exactly which individuals are at risk of the specific transition at time t, which is why counting process data are needed.',
      source: '§13.4.1',
    },
    {
      id: 'ch13-q06',
      prompt:
        'In the transplant example, why do h_TD(t), h_FD(t) and h_RD(t) all describe death but differ?',
      options: [
        'They are identical by definition, since death is death.',
        'The hazard of death depends on the patient\'s current state (after transplant, after graft failure, or after retransplantation), so the rates can all be different.',
        'They differ only because of different time origins.',
        'They differ because different covariates are available in each state.',
      ],
      correctIndex: 1,
      explanation:
        'Each transition has its own baseline intensity and coefficients, and the risk set is defined by the current state. Someone who has had graft failure has a different prognosis from someone who has not, even though the destination is the same.',
      source: '§13.4',
    },
  ],
}
