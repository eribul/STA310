import type { Chapter } from '../types'

/**
 * Chapter 12 - Competing risks (Collett, 4th ed.).
 * Cause-specific hazards, the cumulative incidence (subdistribution) function,
 * cause-specific hazard models and the Fine and Gray model.
 */
export const chapter12: Chapter = {
  number: 12,
  slug: 'competing-risks',
  title: 'Competing risks',
  summary:
    'When one end point prevents others: why the complement of Kaplan-Meier overestimates incidence, cause-specific hazards, the cumulative incidence function, and the Fine and Gray model.',
  bookSections: '§12.1-12.6',
  flashcards: [
    {
      id: 'ch12-f01',
      front: 'What is a competing risk?',
      back: 'A competing risk prevents the event of particular interest from occurring: an individual may experience one of a number of different end points, and the occurrence of any one of them hinders or eliminates the possibility of the others. In a cancer trial, deaths from a myocardial infarct or stroke compete with death from the cancer.',
      source: '§12.1',
    },
    {
      id: 'ch12-f02',
      front: 'How is competing risks data recorded?',
      back: 'As an observed survival time together with a cause indicator: (t_i, c_i), where c_i can be 0, 1, 2, ..., m. A value of zero means no end point was observed (censoring), and j = 1, ..., m identifies the cause of the event.',
      source: '§12.2',
    },
    {
      id: 'ch12-f03',
      front: 'Why is the Kaplan-Meier estimate inappropriate when there are competing risks?',
      back: 'Treating deaths from other causes as censored means the estimate refers to the hypothetical situation in which the cause of interest is the only cause, i.e. all other risks have been removed. It assumes everyone will eventually die from that cause, so 1 minus Kaplan-Meier overestimates the true incidence of the event.',
      source: '§12.2.1',
    },
    {
      id: 'ch12-f04',
      front: 'Define the cause-specific hazard function.',
      back: 'h_j(t) = lim as dt tends to 0 of P(t <= T < t + dt, C = j | T >= t) / dt, which equals f_j(t)/S(t). It is the instantaneous failure rate from cause j at time t in the presence of all other risks, and the overall hazard is the sum of the cause-specific hazards.',
      source: '§12.3.1',
    },
    {
      id: 'ch12-f05',
      front: 'Define the cause-specific cumulative incidence function and state its maximum.',
      back: 'F_j(t) = P(T < t, C = j), the probability of experiencing cause j before time t in the presence of all other risks. As t tends to infinity it approaches pi_j = P(C = j), the ultimate probability of cause j; it does not tend to one, which is why it is also called the subdistribution function.',
      source: '§12.3.2',
    },
    {
      id: 'ch12-f06',
      front: 'How is the cumulative incidence function estimated, and why can it not be obtained from the cause-specific hazard alone?',
      back: 'F-hat_j(t) = sum over event times up to t of (delta_ij / n_i) times S-hat(t_(i-1)), where S-hat is the Kaplan-Meier estimate of the overall survivor function ignoring causes. Because the estimate uses the overall survival, it depends on the hazards of all causes, so the cause-specific incidence cannot be derived from the cause-specific hazard in isolation.',
      source: '§12.3.2',
    },
    {
      id: 'ch12-f07',
      front: 'How are cause-specific hazard models fitted?',
      back: 'A separate model h_ij(t) = exp(beta_j x_i) h_0j(t) is fitted to each cause in turn. For each cause, deaths from that cause are events and deaths from all other causes are treated as censored. Because the partial likelihood factorises over causes, m separate Cox models (or parametric models) can be fitted to the cause-specific survival data.',
      source: '§12.4',
    },
    {
      id: 'ch12-f08',
      front: 'What is the interpretation of a hazard ratio from a cause-specific hazard model, and what are the caveats?',
      back: 'It compares the hazard of the event from that cause at time t for a one-unit covariate difference, in the hypothetical situation where the other causes are removed. Competing events are treated as censored, which requires independent censoring, an assumption that cannot be tested from the observed data; the cause-specific hazard may also be overestimated.',
      source: '§12.4',
    },
    {
      id: 'ch12-f09',
      front: 'Why is a separate model for the cumulative incidence function needed?',
      back: 'The cumulative incidence of a cause depends on the hazard of every competing cause, so how a covariate affects F_j(t) cannot be inferred from the cause-specific hazard models. The Fine and Gray model targets F_j(t) directly.',
      source: '§12.5',
    },
    {
      id: 'ch12-f10',
      front: 'Define the subdistribution hazard used in the Fine and Gray model.',
      back: 'lambda_j(t) = -d/dt log{1 - F_j(t)} = f_j(t) / {1 - F_j(t)}. This can be written as the limiting instantaneous death rate from cause j, given that the individual has not previously died from cause j, and it includes people who have already died from another cause in the denominator. It differs from the cause-specific hazard in both definition and interpretation.',
      source: '§12.5.1',
    },
    {
      id: 'ch12-f11',
      front: 'How does the Fine and Gray partial likelihood handle individuals who have already failed from a competing cause?',
      back: 'They remain in the risk set but carry a weight w_hl = S-hat_c(t_(h)) / S-hat_c(min{t_(h), t_l}), where S-hat_c is the Kaplan-Meier estimate for the censoring distribution. Those who have not yet had an event get weight 1, and the weight decreases with the time between a competing event and the event time being considered, so earlier competing events have less influence.',
      source: '§12.5.1',
    },
    {
      id: 'ch12-f12',
      front: 'How are the results of a Fine and Gray model best reported?',
      back: 'The subdistribution hazard itself is hard to interpret. The fitted model is best summarised through the effect of covariates on the cause-specific cumulative incidence, using F_ij(t) = 1 - exp{-Lambda_ij(t)}, where Lambda_ij(t) = exp(beta_j x_i) Lambda_0j(t) is the cumulative subdistribution hazard.',
      source: '§12.5.1',
    },
    {
      id: 'ch12-f13',
      front: 'How is a competing risks model checked?',
      back: 'Most diagnostics from Chapter 4 carry over to a model for a single cause: martingale and Schoenfeld residual plots for the functional form of a covariate, and scaled Schoenfeld residuals and tests for proportional hazards. In addition, an adaptation of the observed-versus-fitted comparison of Chapter 7 can be used to check a parametric model for the cumulative incidence of each cause.',
      source: '§12.6',
    },
  ],
  questions: [
    {
      id: 'ch12-q01',
      prompt:
        'Why does the complement of the Kaplan-Meier estimate overestimate the incidence of a particular cause?',
      options: [
        'Because it ignores the censoring indicator.',
        'Because treating other causes as censored corresponds to removing those risks entirely, which is not what happens in practice.',
        'Because it uses the wrong risk sets at each event time.',
        'Because Kaplan-Meier cannot be applied to any data with censoring.',
      ],
      correctIndex: 1,
      explanation:
        'The Kaplan-Meier estimate for one cause treats the other causes as censored, so it describes the hypothetical situation where the cause of interest is the only risk. Its complement therefore overstates the real incidence, which is why the cumulative incidence function is used instead.',
      source: '§12.2.1',
    },
    {
      id: 'ch12-q02',
      prompt: 'What is the cumulative incidence function F_j(t) = P(T < t, C = j)?',
      options: [
        'A proper probability distribution function that tends to 1 as t grows.',
        'The probability of experiencing cause j before time t in the presence of all other risks; it tends to pi_j, the ultimate probability of cause j.',
        'The hazard of cause j at time t.',
        'The probability of surviving beyond t given that cause j has not occurred.',
      ],
      correctIndex: 1,
      explanation:
        'Because an individual may die from another cause, F_j(t) increases to the ultimate probability pi_j rather than to 1. For that reason it is also called the subdistribution function.',
      source: '§12.3.2',
    },
    {
      id: 'ch12-q03',
      prompt: 'Why can the cause-specific cumulative incidence not be estimated from the cause-specific hazard alone?',
      options: [
        'Because the cause-specific hazard is not estimable when there are competing risks.',
        'Because the incidence depends on the hazards of all competing causes, so the overall survival must also enter the calculation.',
        'Because the cumulative incidence is a parametric quantity.',
        'Because the risk set is undefined for cause-specific data.',
      ],
      correctIndex: 1,
      explanation:
        'The estimate F-hat_j(t) = sum of (delta_ij / n_i) S-hat(t_(i-1)) uses the overall Kaplan-Meier survivor function, which is driven by every cause of death. Analysing cause-specific hazards alone therefore cannot tell you how a covariate affects incidence.',
      source: '§12.3.2',
    },
    {
      id: 'ch12-q04',
      prompt: 'When fitting a cause-specific hazard model for one cause, how are deaths from other causes handled?',
      options: [
        'They are counted as events for the cause of interest.',
        'They are treated as censored observations at their time of death.',
        'They are removed from the data set entirely.',
        'They are used to define the baseline hazard only.',
      ],
      correctIndex: 1,
      explanation:
        'For each cause in turn, deaths from that cause are events and all other deaths are censored. The estimated hazard ratios then describe the effect of covariates when the other causes have been removed, which is a strong interpretation.',
      source: '§12.4',
    },
    {
      id: 'ch12-q05',
      prompt: 'What does the Fine and Gray model estimate directly?',
      options: [
        'The cause-specific hazard for each cause.',
        'The effect of covariates on the cause-specific cumulative incidence function, via a proportional subdistribution hazards model.',
        'The baseline hazard of the overall process.',
        'The correlation between competing causes.',
      ],
      correctIndex: 1,
      explanation:
        'The Fine and Gray model assumes proportional subdistribution hazards, lambda_ij(t) = exp(beta_j x_i) lambda_0j(t), and is fitted with a weighted partial likelihood that keeps individuals who have already failed from other causes in the risk set. It targets incidence rather than the cause-specific hazard.',
      source: '§12.5.1',
    },
    {
      id: 'ch12-q06',
      prompt:
        'Which assumption about competing risks cannot be checked using the observed data?',
      options: [
        'That the covariate effects are proportional.',
        'That the competing risks are independent of one another.',
        'That the baseline hazard is positive.',
        'That the censoring times are recorded correctly.',
      ],
      correctIndex: 1,
      explanation:
        'The joint distribution of the latent times to each cause cannot be identified from the data, since only the earliest event is observed. Independence of the competing causes is therefore untestable, which is one reason the cause-specific hazard approach needs careful interpretation.',
      source: '§12.3.1',
    },
  ],
}
