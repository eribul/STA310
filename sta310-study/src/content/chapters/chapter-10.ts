import type { Chapter } from '../types'

/**
 * Chapter 10 - Frailty models (Collett, 4th ed.).
 * Frailty as a random effect, the gamma and lognormal frailty distributions,
 * shared frailty for clustered and recurrent data, and how to test for frailty.
 */
export const chapter10: Chapter = {
  number: 10,
  slug: 'frailty-models',
  title: 'Frailty models',
  summary:
    'Unmeasured heterogeneity between individuals modelled as a random effect: the gamma and lognormal frailty distributions, shared frailty for clustered data, and the consequences for hazard ratios.',
  bookSections: '§10.1-10.8',
  flashcards: [
    {
      id: 'ch10-f01',
      front: 'What is frailty and why is it modelled as a random effect?',
      back: 'Frailty represents the combined effect of unmeasured variables that make some individuals more prone to the event than others. Because its values are drawn from a population of possible values and cannot be measured, it is treated as a random effect with an underlying distribution; only the variance of that distribution needs estimating.',
      source: '§10.1.2',
    },
    {
      id: 'ch10-f02',
      front: 'Write the proportional hazards model with an individual frailty term.',
      back: 'h_i(t) = z_i exp(beta x_i) h_0(t), where z_i is the frailty. Equivalently h_i(t) = exp(beta x_i + u_i) h_0(t) with u_i = log z_i. A value of z_i = 1 (u_i = 0) corresponds to the model with no frailty.',
      source: '§10.2',
    },
    {
      id: 'ch10-f03',
      front: 'What does a frailty value greater than one mean, and what does larger frailty imply?',
      back: 'Frailty acts multiplicatively on the hazard, so z_i > 1 increases the hazard above the underlying proportional hazards model and z_i < 1 reduces it. Individuals with larger frailty die sooner than those with smaller frailty.',
      source: '§10.2',
    },
    {
      id: 'ch10-f04',
      front: 'Why can frailty produce an observed hazard that declines over time even if the underlying hazard is constant?',
      back: 'Frailty acts as a selection effect. The frailest individuals die earliest, so those still alive later are the less frail ones. The observable hazard therefore declines purely through heterogeneity, and the data cannot distinguish this explanation from a genuine decline.',
      source: '§10.1.2',
    },
    {
      id: 'ch10-f05',
      front: 'Why is the gamma frailty distribution used so often?',
      back: 'For a gamma frailty with unit mean and variance theta^-1, the integration over the frailty can be carried out analytically, giving closed forms for the observable survivor and hazard functions. The lognormal frailty has no such convenient closed form.',
      source: '§10.3',
    },
    {
      id: 'ch10-f06',
      front: 'What happens to the observable hazard ratio when frailty is present?',
      back: 'It is no longer constant but declines over time towards unity. So proportional hazards does not hold in the presence of frailty, even though the underlying (unobserved) model is a proportional hazards model, and the effect of a covariate is attenuated at later times.',
      source: '§10.3.2',
    },
    {
      id: 'ch10-f07',
      front: 'How can frailty explain a unimodal observed hazard?',
      back: 'A Weibull baseline hazard is monotone, but combined with gamma frailty the observable hazard can be unimodal. An apparent rise and fall in the hazard may therefore be a consequence of heterogeneity rather than of the intrinsic baseline hazard.',
      source: '§10.3.1',
    },
    {
      id: 'ch10-f08',
      front: 'How is the likelihood for a parametric model with frailty constructed?',
      back: 'The likelihood contribution for an individual is first written conditional on the unknown random effect, then integrated over the assumed frailty distribution: the product over individuals of the integral of {h_i(t_i)}^delta_i S_i(t_i) f(u_i) du_i. Numerical integration is generally needed.',
      source: '§10.4',
    },
    {
      id: 'ch10-f09',
      front: 'What is shared frailty, and when is it useful?',
      back: 'All individuals within a group are assumed to share the same frailty, which models association between their survival times. It applies to clustered data (transplant centres, litters, paired organs) and to repeated events within an individual, where the recurrence times are not independent.',
      source: '§10.1.3, §10.7',
    },
    {
      id: 'ch10-f10',
      front: 'How do you test whether a frailty effect is present?',
      back: 'Compare the -2 log L-hat values for models with and without frailty for the same covariates. The change is referred to a chi-squared distribution on one degree of freedom, but this test is conservative; a more accurate reference distribution is the equally weighted mixture 0.5(chi-squared on 0 + chi-squared on 1), which halves the p-value.',
      source: '§10.6.1',
    },
    {
      id: 'ch10-f11',
      front: 'What statistic is used to compare Cox models that include frailty?',
      back: 'The maximised marginal log-likelihood, -2 log L_m, rather than -2 log L-hat from a partial likelihood. Differences between values of -2 log L_m for alternative models are compared with percentage points of a chi-squared distribution in the usual way.',
      source: '§10.6',
    },
    {
      id: 'ch10-f12',
      front: 'In a shared frailty model, what is the estimated frailty for a group?',
      back: 'For gamma frailty, the estimate is z_i = (theta + d_i) / {theta + sum over the group of exp(beta x_ij) H_0(t_ij)}, where d_i is the number of deaths in the group. The larger the number of deaths relative to the expected number, the larger the estimated frailty.',
      source: '§10.7.1',
    },
    {
      id: 'ch10-f13',
      front: 'How is dependence between the survival times in a shared frailty model summarised?',
      back: 'For gamma frailty, Kendall\'s coefficient of rank correlation is tau = (1 + 2 theta)^-1, where theta^-1 is the frailty variance. A larger frailty variance means a higher degree of dependence between the times within a group.',
      source: '§10.8.3',
    },
  ],
  questions: [
    {
      id: 'ch10-q01',
      prompt:
        'In a proportional hazards model with a frailty term, how does the frailty act, and what does z_i = 1 mean?',
      options: [
        'It acts additively on the hazard, and z_i = 1 means double the underlying hazard.',
        'It acts multiplicatively on the hazard, and z_i = 1 corresponds to no frailty at all.',
        'It acts on the time scale rather than the hazard, and z_i = 1 means the hazard is zero.',
        'It affects only the baseline hazard function, and z_i = 1 means it is unidentifiable.',
      ],
      correctIndex: 1,
      explanation:
        'h_i(t) = z_i exp(beta x_i) h_0(t): the frailty multiplies the hazard, so a value of 1 has no effect and returns the standard model. Values above one mean higher risk and below one lower risk.',
      source: '§10.2',
    },
    {
      id: 'ch10-q02',
      prompt:
        'A study finds that the observed hazard of death declines over time. What can be concluded if frailty is a possibility?',
      options: [
        'The underlying hazard must genuinely decline, because observed and underlying hazards coincide.',
        'The decline could be caused by heterogeneity alone, and the data cannot distinguish this from a genuine decline.',
        'Frailty cannot produce a declining hazard under any circumstances.',
        'The model must be wrong because hazards are always monotone.',
      ],
      correctIndex: 1,
      explanation:
        'Because the frailest individuals die first, the population still at risk becomes progressively less frail, which lowers the observed hazard even if the individual-level hazard is constant. The two explanations are not distinguishable from the survival times alone.',
      source: '§10.1.2',
    },
    {
      id: 'ch10-q03',
      prompt: 'What is the practical advantage of the gamma frailty distribution?',
      options: [
        'It guarantees proportional hazards in the observable hazard.',
        'It allows the integration over the frailty to be done analytically, giving closed-form observable survivor and hazard functions.',
        'It removes the need to estimate a frailty variance.',
        'It works only when there is no censoring.',
      ],
      correctIndex: 1,
      explanation:
        'With a gamma frailty the integral over the random effect has a closed form, producing tractable expressions for the observable survivor and hazard functions. This mathematical convenience is why it is so widely used.',
      source: '§10.3',
    },
    {
      id: 'ch10-q04',
      prompt: 'What is the effect of frailty on the observable hazard ratio for a covariate?',
      options: [
        'It becomes constant and equal to the underlying hazard ratio.',
        'It becomes time-dependent and typically declines towards unity over time.',
        'It becomes negative, which is why hazard ratios are hard to interpret.',
        'It doubles, because the frailty variance is added to the coefficient.',
      ],
      correctIndex: 1,
      explanation:
        'The observable hazard ratio is a non-linear function of time that starts at the underlying value and decays towards unity. This is one reason why frailty models can accommodate apparently non-proportional hazards.',
      source: '§10.3.2',
    },
    {
      id: 'ch10-q05',
      prompt:
        'When testing whether a frailty variance is zero, why is a chi-squared distribution on one degree of freedom conservative?',
      options: [
        'Because the test is one-sided and the variance cannot be negative, so the correct reference is the mixture 0.5(chi-squared on 0 + chi-squared on 1), which halves the p-value.',
        'Because the likelihood is a partial likelihood and has no distribution.',
        'Because the frailty variance is always estimated as positive.',
        'Because the test requires bootstrapping in all circumstances.',
      ],
      correctIndex: 0,
      explanation:
        'The hypothesis sits on the boundary of the parameter space, so the usual chi-squared theory does not apply. Using the boundary mixture makes the test less conservative; equivalently, the p-value from a chi-squared on one degree of freedom should be halved.',
      source: '§10.6.1',
    },
    {
      id: 'ch10-q06',
      prompt:
        'In a shared frailty model fitted to pairs of organs from the same individual, what does a large estimated frailty variance indicate?',
      options: [
        'That the two event times within a pair are weakly associated.',
        'That the event times within a pair are highly dependent, corresponding to a larger Kendall\'s tau.',
        'That the model has failed to converge.',
        'That the baseline hazard is not monotone.',
      ],
      correctIndex: 1,
      explanation:
        'In a shared frailty model the frailty variance measures dependence between times within a group. For gamma frailty, tau = (1 + 2 theta)^-1, so a large variance produces a larger rank correlation.',
      source: '§10.8.3',
    },
  ],
}
