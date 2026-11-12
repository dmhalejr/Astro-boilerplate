// Regenerates public/David_Hale_Resume.pdf from src/utils/Resume.ts so the
// downloadable PDF and the /resume page can never drift apart.
//
//   npm run resume:pdf
//
// Needs Chrome. Set CHROME_PATH if it is not in the default macOS location.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const { resume } = await import(
  pathToFileURL(resolve('src/utils/Resume.ts')).href
);

const chrome =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const output = resolve('public/David_Hale_Resume.pdf');

const esc = (text) =>
  String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const skills = resume.skills
  .map(
    (group) =>
      `<p><b>${esc(group.label)}:</b> ${group.items.map(esc).join(', ')}</p>`
  )
  .join('');

const experience = resume.experience
  .map(
    (role) => `
    <section class="role">
      <div class="row"><h3>${esc(role.company)}</h3><span class="dates">${esc(
        role.start
      )} &ndash; ${esc(role.end)}</span></div>
      <p class="title">${esc(role.title)}</p>
      <ul>${role.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
    </section>`
  )
  .join('');

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(resume.name)} - Resume</title>
<style>
  @page { size: Letter; margin: 0.4in 0.55in; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 9.4pt/1.32 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #111827; }
  h1 { margin: 0; font-size: 27pt; line-height: 1.1; color: #1b2234; }
  .headline { margin: 2pt 0 0; font-size: 12pt; font-weight: 700; color: #186a4f; }
  .contact { margin: 4pt 0 7pt; color: #4b5563; font-size: 9pt; }
  .contact a { color: inherit; text-decoration: none; }
  .summary { margin: 0 0 6pt; }
  h2 { margin: 8pt 0 4pt; padding-bottom: 1.5pt; border-bottom: 0.75pt solid #d1d5db; font-size: 9pt; letter-spacing: .04em; text-transform: uppercase; color: #186a4f; }
  p { margin: 0 0 2pt; }
  .role { margin-bottom: 5pt; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; align-items: baseline; }
  h3 { margin: 0; font-size: 10.5pt; color: #1b2234; }
  .dates { color: #4b5563; font-size: 9pt; }
  .title { font-weight: 700; color: #4b5563; font-size: 9pt; }
  ul { margin: 1pt 0 0; padding-left: 13pt; }
  li { margin-bottom: 1pt; }
  li::marker { color: #186a4f; }
</style></head>
<body>
  <h1>${esc(resume.name)}</h1>
  <p class="headline">${esc(resume.headline)} | ${esc(resume.focus)}</p>
  <p class="contact">${esc(resume.location)} &nbsp;&middot;&nbsp; Reach me on LinkedIn: <a href="${esc(
    resume.linkedin
  )}">${esc(resume.linkedin.replace('https://', ''))}</a></p>
  <p class="summary">${esc(resume.summary)}</p>
  <h2>Technical skills</h2>${skills}
  <h2>Experience</h2>${experience}
  <h2>Education</h2>
  <p><b>${esc(resume.education.school)}</b> | ${esc(resume.education.degree)} | ${esc(
    resume.education.years
  )}</p>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'resume-pdf-'));
try {
  const page = join(dir, 'resume.html');
  writeFileSync(page, html);
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--user-data-dir=${join(dir, 'profile')}`,
      `--print-to-pdf=${output}`,
      pathToFileURL(page).href,
    ],
    { stdio: 'ignore' }
  );
  console.log(`Wrote ${output}`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
