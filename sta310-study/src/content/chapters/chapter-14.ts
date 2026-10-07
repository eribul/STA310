import type { Chapter } from '../types'

/**
 * Chapter 14 - Dependent censoring (Collett, 4th ed.).
 * Recognising dependent censoring, sensitivity analysis, and Cox regression
 * with inverse probability of censoring weights.
 */
export const chapter14: Chapter = {
  number: 14,
  slug: 'dependent-censoring',
  title: 'Dependent censoring',
  summary:
    'When censoring is related to the event time: how to look for it, how to assess the sensitivity of conclusions to it, and how to fit a Cox model with inverse probability of censoring weights.',
  bookSections: '§14.1-14.3',
  flashcards: [
    {
      id: 'ch14-f01',
      front: 'Define dependent censoring and explain why it violates a standard assumption.',
      back: 'Dependent (informative) censoring occurs when there is a dependence between the time to the event and the time to censoring. The methods of Chapters 1 to 13 assume independent (non-informative) censoring, under which a censored individual is representative of those still at risk. If censoring is informative, that assumption fails and naive analyses are biased.',
      source: '§14.1',
    },
    {
      id: 'ch14-f02',
      front: 'Why can dependent censoring not be detected from the observed data alone?',
      back: 'Both the event time and the censoring time cannot be observed for the same individual: you see whichever comes first. Because the joint distribution is not identifiable from the data, neither the presence nor the extent of dependent censoring can be established without additional assumptions or external information. The context of the study must be used instead.',
      source: '§14.1',
    },
    {
      id: 'ch14-f03',
      front: 'How can you look for possible dependent censoring in a data set?',
      back: 'Plot observed survival times against explanatory variables, distinguishing censored from uncensored observations, and look for patterns such as more censoring early on a particular treatment or over a particular range of a covariate. More formally, fit a logistic regression with a binary response that is unity for a censored time; if the probability of censoring depends on covariates in the model, independent censoring may have been violated.',
      source: '§14.1',
    },
    {
      id: 'ch14-f04',
      front: 'Describe the two complementary extreme analyses used to assess sensitivity to dependent censoring.',
      back: 'First, assume that censored individuals are at high risk and would have had the event immediately after their censoring time: designate all censored times as event times. Second, assume censored individuals are at low risk and replace each censored time by the longest observed event time. If the original analysis and both extremes give the same conclusions, the results are not sensitive to dependent censoring.',
      source: '§14.2',
    },
    {
      id: 'ch14-f05',
      front: 'How is the risk score compared with the censoring score in a sensitivity analysis?',
      back: 'Fit Weibull proportional hazards models for both the hazard of death and the hazard of censoring, giving the risk score beta x_i and the censoring score beta_c x_i. Plotting the risk score against the censoring score reveals an association, which suggests dependent censoring.',
      source: '§14.2.1',
    },
    {
      id: 'ch14-f06',
      front: 'What is the role of the parameter phi in the sensitivity analysis?',
      back: 'phi measures the extent of dependence between the survival time T and the censoring time C: phi = 0 corresponds to independent censoring, and the dependence grows as phi increases; phi is an upper bound to the correlation between T and C. The sensitivity index B(x_0) = eta_phi(x_0) - eta(x_0) then gives the change in the risk score, and is usually evaluated for phi in the range (-0.3, 0.3).',
      source: '§14.2.1',
    },
    {
      id: 'ch14-f07',
      front: 'What is the basic idea behind the inverse probability of censoring weighted (IPCW) analysis?',
      back: 'Instead of assuming independent censoring, model the censoring process and reweight the observed individuals to represent those who were censored. If an individual at risk at time t had only a one in three chance of still being uncensored at t, then on average two similar individuals were censored before t, so the observed individual is given weight 3, the reciprocal of the censoring probability.',
      source: '§14.3.1',
    },
    {
      id: 'ch14-f08',
      front: 'How are the IPCW weights obtained?',
      back: 'Fit a survival model to the time to censoring, treating censored times as events and event times as censored (i.e. using the indicator 1 - delta). From the estimated baseline survivor function S_c0(t), the probability of remaining uncensored to time t for the ith individual is S_ci(t) = {S_c0(t)}^exp(beta_c x_i), and the weight is w_i(t) = {S_ci(t)}^-1.',
      source: '§14.3.1',
    },
    {
      id: 'ch14-f09',
      front: 'Which model is recommended for the censoring times, and why?',
      back: 'A parametric model, in practice usually a Weibull model, because the weights then become a continuous function of time and change at every event time. The exact form of the model is not critical.',
      source: '§14.3.1',
    },
    {
      id: 'ch14-f10',
      front: 'Write the weighted partial likelihood used for IPCW estimation.',
      back: 'The Cox partial likelihood is reformulated in counting process form with the weights inserted into numerator and denominator: the product over individuals and event times of {w_i(t)Y_i(t)exp(beta x_i) / sum over l of w_l(t)Y_l(t)exp(beta x_l)} raised to dN_i(t). Time-dependent covariates can also be accommodated.',
      source: '§14.3.1',
    },
    {
      id: 'ch14-f11',
      front: 'Why are stabilised weights sometimes used instead of the raw IPCW weights?',
      back: 'The weights w_i(t) can become very large when the probability of remaining uncensored beyond t is small, which causes computational problems and unstable estimates. Stabilised weights w*_i(t) = S_KM(t) / S_ci(t), where S_KM(t) is the Kaplan-Meier estimate of the censoring distribution, reduce this variability.',
      source: '§14.3.1',
    },
    {
      id: 'ch14-f12',
      front: 'When analysing with dependent censoring, what simple alternatives exist and what are their limits?',
      back: 'You can restrict the analysis to a time before any censoring has occurred, or model the probability of surviving beyond such a time using the complementary log-log approach of Section 11.1.1. Both are unlikely to be useful when dependent censoring occurs early in the study, which is when the IPCW approach is needed.',
      source: '§14.3',
    },
  ],
  questions: [
    {
      id: 'ch14-q01',
      prompt: 'Why is it impossible to determine from the data whether censoring is dependent?',
      options: [
        'Because censoring times are never recorded.',
        'Because only the earlier of the event time and the censoring time is observed, so the joint distribution of the two is not identifiable.',
        'Because the hazard function is unspecified.',
        'Because dependent censoring only occurs in small samples.',
      ],
      correctIndex: 1,
      explanation:
        'For each individual you observe either the event or the censoring, never both, so the association between the two times cannot be estimated. Study context and external information must be used to judge the plausibility of independent censoring.',
      source: '§14.1',
    },
    {
      id: 'ch14-q02',
      prompt: 'In the sensitivity analysis, what does the assumption that censored times are actually event times represent?',
      options: [
        'The best guess for the missing event times.',
        'The extreme in which censored individuals are those at highest risk, which gives one bound for the effect of dependent censoring.',
        'An assumption of independent censoring.',
        'A method for imputing the median survival time.',
      ],
      correctIndex: 1,
      explanation:
        'Designating all censored times as events assumes the censored individuals would have failed immediately afterwards, the worst case for the event rate. The other extreme replaces censored times by the longest observed event time.',
      source: '§14.2',
    },
    {
      id: 'ch14-q03',
      prompt: 'How are the IPCW weights calculated at time t?',
      options: [
        'As the Kaplan-Meier estimate of the survival function at t.',
        'As the reciprocal of the model-based probability of remaining uncensored to time t, S_ci(t)^-1.',
        'As the number of individuals at risk at time t.',
        'As the ratio of censored to uncensored observations.',
      ],
      correctIndex: 1,
      explanation:
        'The weight is the reciprocal of the probability of not having been censored before t, so individuals who had a high chance of being censored receive more weight and stand in for those who were lost.',
      source: '§14.3.1',
    },
    {
      id: 'ch14-q04',
      prompt: 'Why is a Weibull model usually chosen for the censoring times rather than a Cox model?',
      options: [
        'Because censoring models cannot be semiparametric.',
        'Because the weights then vary smoothly with time, which is convenient since they change in value at every event time.',
        'Because the Weibull model guarantees that censoring is independent.',
        'Because it removes the need for stabilised weights.',
      ],
      correctIndex: 1,
      explanation:
        'The weights must be evaluated continuously as the data are expanded into counting process format. A parametric form gives w_i(t) as a smooth function of t, and the exact choice of distribution is not critical.',
      source: '§14.3.1',
    },
    {
      id: 'ch14-q05',
      prompt: 'What problem do very large IPCW weights cause, and how is it addressed?',
      options: [
        'They bias the baseline hazard, which is fixed by stratification.',
        'They make the estimates unstable and cause computational problems; stabilised weights, dividing by the censoring Kaplan-Meier estimate, reduce their variability.',
        'They make the model non-proportional, which is fixed by adding a time-dependent term.',
        'They have no effect because the weights cancel in the partial likelihood.',
      ],
      correctIndex: 1,
      explanation:
        'When the probability of remaining uncensored is small the reciprocal becomes very large, so a few observations dominate. Stabilised weights w*_i(t) = S_KM(t)/S_ci(t) keep the weights under control.',
      source: '§14.3.1',
    },
    {
      id: 'ch14-q06',
      prompt:
        'A censoring model shows that the probability of censoring depends strongly on a covariate that also affects survival. What does this suggest?',
      options: [
        'That the covariate should simply be dropped from the model.',
        'That the assumption of independent censoring may be violated and the dependent censoring methods should be considered.',
        'That the event is not censored, so no adjustment is needed.',
        'That the hazard ratio is biased upwards but the direction cannot be determined.',
      ],
      correctIndex: 1,
      explanation:
        'If the chance of being censored depends on prognostic variables, censored individuals are no longer representative of those at risk, so independent censoring is doubtful. Sensitivity analysis and IPCW are the appropriate responses.',
      source: '§14.1',
    },
  ],
}
