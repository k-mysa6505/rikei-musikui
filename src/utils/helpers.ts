//  utils/helpers.ts

const renderMathJax = () => {
  if (window.MathJax) {
    const formulaContainer = document.getElementById("root");
    if (formulaContainer) {
      window.MathJax.typeset([formulaContainer]);
    }
  }
}

export default renderMathJax;
