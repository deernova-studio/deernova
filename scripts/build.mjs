import { buildSite } from './build-site.mjs';
import { buildSkills } from './build-skill.mjs';
import { buildIcons } from './icons.mjs';

await buildIcons();
await buildSite();
const manifests = await buildSkills();
console.log(`Built website and ${manifests.map(m => `${m.name} ${m.version}`).join(', ')}.`);
