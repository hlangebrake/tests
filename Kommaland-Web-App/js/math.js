/** Exact decimal validation. No eval(), no binary floating-point answer comparisons. */
export function decimal(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  let s = String(value).trim();
  if (s.length > 64 || !/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(s)) return null;
  s = s.replace(',', '.');
  const negative = s.startsWith('-');
  s = s.replace(/^[+-]/, '');
  const [whole, fraction = ''] = s.split('.');
  return { n: BigInt((whole || '0') + fraction) * (negative ? -1n : 1n), d: 10n ** BigInt(fraction.length) };
}
export function equalDecimal(a, b) {
  const x = decimal(a), y = decimal(b);
  return !!x && !!y && x.n * y.d === y.n * x.d;
}
export function checkAnswer(task, answer) {
  if (!task || answer == null) return false;
  switch (task.type) {
    case 'number': case 'line': return equalDecimal(answer, task.answer);
    case 'choice': return Number.isInteger(answer) && answer === task.answer;
    case 'multi': return Array.isArray(answer) && answer.length === task.answer.length &&
      new Set(answer).size === answer.length && task.answer.every(x => answer.includes(x));
    case 'order': case 'classify': return Array.isArray(answer) && answer.length === task.answer.length &&
      task.answer.every((x, i) => x === answer[i]);
    default: return false;
  }
}
export function formatNumber(value, digits = 3) {
  return Number(value).toLocaleString('de-DE', {maximumFractionDigits: digits, useGrouping: false});
}
export function describeAnswer(task) {
  if (task.type === 'number' || task.type === 'line') return String(task.answer).replace('.', ',') + (task.unit ? ' ' + task.unit : '');
  if (task.type === 'choice') return task.options[task.answer];
  if (task.type === 'multi') return task.answer.map(i => task.options[i]).join(' · ');
  if (task.type === 'order') return task.answer.map(i => task.items[i]).join(' → ');
  if (task.type === 'classify') return task.items.map((s,i) => s + ': ' + task.categories[task.answer[i]]).join(' · ');
  return '';
}
