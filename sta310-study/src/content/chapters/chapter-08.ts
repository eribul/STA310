import type { Chapter } from '../types'

/**
 * Chapter 8 - Time-dependent variables (Collett, 4th ed.).
 * Internal vs external time-dependent variables, the counting process format,
 * estimation, applications (transplantation, testing PH) and joint modelling.
 */
export const chapter08: Chapter = {
  number: 8,
  slug: 'time-dependent-variables',
  title: 'Time-dependent variables',
  summary:
    'Covariates whose values change during follow-up: internal vs external variables, time-varying coefficients, the counting process format, and joint modelling of longitudinal and survival data.',
  bookSections: '§8.1-8.7',
  flashcards: [
    {
      id: 'ch08-f01',
      front: 'Distinguish internal from external time-dependent variables.',
      back: 'Internal variables relate to a particular individual and can only be measured while the patient is alive (repeated lung function, white cell count, graft versus host disease status). External variables do not require the patient\'s survival for their existence; their future values may be known in advance (a planned drug dose) or be entirely independent of the individual (air temperature).',
      source: '§8.1',
    },
    {
      id: 'ch08-f02',
      front: 'What is a time-varying coefficient, and how is it related to a time-dependent variable?',
      back: 'If the coefficient of a time-fixed variable X is itself a function of time, beta(t), the log-hazard ratio is not constant and proportional hazards no longer holds. A term beta(t)X can be written as beta X(t) with X(t) = X t, i.e. as a time-dependent variable with a constant coefficient.',
      source: '§8.1.1',
    },
    {
      id: 'ch08-f03',
      front: 'Why is it wrong to put X0 times t into a Cox model as if it were a baseline covariate?',
      back: 'X1 = X0 t is partly determined by the survival time, so individuals who live longer automatically have larger X1. The coefficient of X1 will then typically be significantly negative, but this reflects the construction of the variable rather than a real effect. X1 must be handled as a time-dependent variable.',
      source: '§8.1.1',
    },
    {
      id: 'ch08-f04',
      front: 'Write the Cox model with time-dependent variables and say whether it is a proportional hazards model.',
      back: 'h_i(t) = exp(beta_1 x_1i(t) + ... + beta_p x_pi(t)) h_0(t). It is not a proportional hazards model, because the relative hazard h_i(t)/h_0(t) changes with time. The baseline hazard h_0(t) is the hazard for an individual whose variables are all zero at the time origin and stay there.',
      source: '§8.2',
    },
    {
      id: 'ch08-f05',
      front: 'How is a coefficient beta_j interpreted in a model with time-dependent variables?',
      back: 'As the log-hazard ratio at time t for two individuals whose value of the jth variable differs by one unit at that time, with the two individuals having the same values of all other variables at that time.',
      source: '§8.2',
    },
    {
      id: 'ch08-f06',
      front: 'What must be known in order to maximise the partial log-likelihood when variables are time-dependent?',
      back: 'At every death time you need the value of each time-dependent variable, at that time, for every individual still in the risk set. This is easy for variables that are explicit functions of time or preordained external variables, but generally impossible for internal variables, whose values between measurements must be approximated.',
      source: '§8.2.1',
    },
    {
      id: 'ch08-f07',
      front: 'Describe the counting process (start, stop, status) format.',
      back: 'Each individual is represented by a series of time intervals over which all explanatory variables are constant; the interval (Start, Stop] includes t = Stop but not t = Start. Status is zero for every interval except possibly the last, where it is unity if an event occurred at the stop time. This extended data set is then analysed with the usual software.',
      source: '§8.3',
    },
    {
      id: 'ch08-f08',
      front: 'What happens to the baseline cumulative hazard estimate when variables are time-dependent?',
      back: 'The Nelson-Aalen estimate is adapted so that the risk-set sum uses each individual\'s covariate values at the relevant event time: H_0(t) = sum over event times of d_j / sum over the risk set of exp(beta x_l(t)). The summation is much more laborious because covariates must be evaluated for everyone at risk at every event time.',
      source: '§8.4',
    },
    {
      id: 'ch08-f09',
      front: 'Why is the survivor function for an individual harder to estimate when variables are time-dependent?',
      back: 'The result S_i(t) = {S_0(t)}^exp(beta x_i) no longer holds, because it assumed time-fixed covariates. The individual survivor function is obtained by integrating exp(beta x_i(u))h_0(u) over u, so it depends on the future values of the time-dependent variables, which are usually unknown. Instead, conditional probabilities of surviving an interval (t, t+h), given alive at t, are estimated.',
      source: '§8.4',
    },
    {
      id: 'ch08-f10',
      front: 'Can models with time-dependent variables be compared in the usual way?',
      back: 'Yes. Model fitting again leads to a maximised partial likelihood, so nested models are compared through the change in -2 log L-hat against percentage points of a chi-squared distribution with degrees of freedom equal to the difference in the number of beta parameters.',
      source: '§8.5',
    },
    {
      id: 'ch08-f11',
      front: 'Why can a time-dependent variable mask a treatment difference?',
      back: 'The effect of treatment on the hazard may operate through the changing value of a variable measured after randomisation (for example a white cell count during chemotherapy). Adjusting for that variable removes part of the treatment effect, so a real difference can disappear from the model; the pathway of the effect must be considered.',
      source: '§8.5.1',
    },
    {
      id: 'ch08-f12',
      front: 'Explain the transplant example: why is a time-dependent indicator needed?',
      back: 'To receive a transplant a patient must survive until an organ is available, so transplanted and non-transplanted patients have different time origins and are not directly comparable. Using X(t) = 0 before transplantation and 1 afterwards keeps a single common time origin. Then exp(beta) is the hazard ratio after transplantation relative to no transplant at that time.',
      source: '§8.6',
    },
    {
      id: 'ch08-f13',
      front: 'What is joint modelling of longitudinal and survival data and why is it used?',
      back: 'A model for the longitudinal variable over time is combined with a model for the survival time, so that the hazard can depend on the true underlying (continuous) value of the longitudinal variable. This avoids the unrealistic step-function assumption and the assumption that the measured covariate is free of measurement error.',
      source: '§8.7',
    },
  ],
  questions: [
    {
      id: 'ch08-q01',
      prompt: 'Which of these is an internal time-dependent variable?',
      options: [
        'A drug dose that is varied in a predetermined way during the study.',
        'Serum cholesterol measured repeatedly on each patient during follow-up.',
        'The daily air temperature in the city where a patient lives.',
        'A treatment group indicator fixed at randomisation.',
      ],
      correctIndex: 1,
      explanation:
        'Internal variables are measured on the individual and exist only while they are alive, so repeated serum cholesterol is internal. A preordained dose schedule and air temperature are external variables, and a randomisation indicator is time-fixed.',
      source: '§8.1',
    },
    {
      id: 'ch08-q02',
      prompt:
        'A researcher adds the variable X0 x t to a Cox model as a baseline covariate, where X0 is measured at the time origin and t is the survival time. What goes wrong?',
      options: [
        'Nothing; this is the recommended way to test proportional hazards.',
        'The variable is partly determined by the outcome, so its coefficient is driven by the construction of the variable rather than by any real effect.',
        'The model can no longer be fitted because no baseline hazard exists.',
        'It only works if the covariate is a factor rather than a variate.',
      ],
      correctIndex: 1,
      explanation:
        'Individuals who survive longer have larger values of X0 x t, so the variable is a function of the response. Such terms must be handled as time-dependent variables; this is exactly why Chapter 4\'s PH test is set up as a time-dependent covariate.',
      source: '§8.1.1',
    },
    {
      id: 'ch08-q03',
      prompt:
        'In the counting process format, what does the status indicator look like for an individual with repeated covariate measurements and an event?',
      options: [
        'It is unity in every interval.',
        'It is zero in every interval except possibly the last, where it is unity if the event occurred at the stop time.',
        'It is unity in the first interval and zero afterwards.',
        'It is not needed when covariates are time-dependent.',
      ],
      correctIndex: 1,
      explanation:
        'Each row is an interval (Start, Stop] over which covariates are constant. Status is 0 for all intervals other than possibly the final one, where it is 1 if the event is observed at Stop and 0 if that time is censored.',
      source: '§8.3',
    },
    {
      id: 'ch08-q04',
      prompt:
        'In the model h_i(t) = exp(beta_1 x_1i(t) + beta_2 x_2i(t)) h_0(t), how is beta_1 interpreted at time t?',
      options: [
        'The hazard ratio for a one-unit increase in x_1 at the time origin, regardless of later values.',
        'The log-hazard ratio at time t between two individuals differing by one unit in x_1 at that time and agreeing on x_2 at that time.',
        'The average log-hazard ratio over the whole follow-up period.',
        'The change in the median survival time per unit of x_1.',
      ],
      correctIndex: 1,
      explanation:
        'The ratio of the hazards of two individuals at a given time t is multiplicative in beta. So beta_1 is the log-hazard ratio for a one-unit difference in the current value of x_1, holding the other current values equal.',
      source: '§8.2',
    },
    {
      id: 'ch08-q05',
      prompt: 'Is the model with time-dependent variables still a proportional hazards model?',
      options: [
        'Yes, because the baseline hazard function is still unspecified.',
        'No, because the relative hazard h_i(t)/h_0(t) depends on time.',
        'Yes, as long as no internal variables are used.',
        'Only if the coefficients are themselves constant in time.',
      ],
      correctIndex: 1,
      explanation:
        'The relative hazard is exp(beta_1 x_1i(t) + ...), which changes with t unless the variables are constant. Proportional hazards is lost, which is exactly what makes the model useful for handling non-proportionality.',
      source: '§8.2',
    },
    {
      id: 'ch08-q06',
      prompt:
        'Why is it not valid simply to compare the survival of patients who received an organ transplant with those who did not?',
      options: [
        'Because transplants are always beneficial, so no comparison is needed.',
        'Because a patient must survive until a suitable organ is available, so the two groups have different time origins and are not comparable.',
        'Because transplant status is a factor with more than two levels.',
        'Because the transplant group is always larger than the control group.',
      ],
      correctIndex: 1,
      explanation:
        'Requiring survival to transplantation introduces a guarantee-time effect and a different time origin. A time-dependent indicator that switches from 0 to 1 at transplantation keeps one common time origin and gives a valid comparison.',
      source: '§8.6',
    },
  ],
}
