export const mathMacros = {
  '\\dv': `{\\dfrac{{\\rm d}{#1}}{{\\rm d}{#2}}}`,
  '\\pdv': `{\\dfrac{{\\partial}{#1}}{{\\partial}{#2}}}`,
  '\\dd': `{{\\rm d}{#1}}`,
  '\\norm': `{\\left \\Vert {#1} \\right \\Vert}`,
  '\\iindep': `{\\perp \\! \\! \\! \\perp}`,
  '\\indep': `\\mathrel{\\iindep}`,
  '\\expect': `{\\mathbb{E} \\left[{#1}\\right]}`,
  '\\vari': `{\\mathrm{Var} \\left[{#1}\\right]}`,
  '\\cov': `{\\mathrm{Cov} \\left({#1}, {#2}\\right)}`,
};
