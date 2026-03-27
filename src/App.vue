<template>
  <div class="app">
    <header class="app-header">
      <h1>Avatar Generator</h1>
      <p>Fill in the persona details below to generate a deterministic pixel avatar.</p>
    </header>

    <main class="app-main">
      <section class="form-section">
        <h2>Persona Details</h2>
        <form class="persona-form" @submit.prevent>
          <div class="field">
            <label for="name">Name</label>
            <input id="name" v-model="persona.name" type="text" placeholder="e.g. Jane Smith" />
          </div>

          <div class="field">
            <label for="job">Job Title</label>
            <input id="job" v-model="persona.job" type="text" placeholder="e.g. Senior Product Manager" />
          </div>

          <div class="field">
            <label for="company">Company</label>
            <input id="company" v-model="persona.company" type="text" placeholder="e.g. Acme Corp" />
          </div>

          <div class="field">
            <label for="type">Persona Type</label>
            <select id="type" v-model="persona.type">
              <option value="">-- Select type --</option>
              <option v-for="t in personaTypes" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>

          <div class="field">
            <label for="industry">Industry</label>
            <select id="industry" v-model="persona.industry">
              <option value="">-- Select industry --</option>
              <option v-for="i in industries" :key="i" :value="i">{{ i }}</option>
            </select>
          </div>
        </form>
      </section>

      <section class="preview-section">
        <h2>Preview</h2>
        <div class="avatar-card">
          <AvatarDisplay :persona="filledPersona" :size="160" />
          <div class="avatar-meta">
            <p class="avatar-name">{{ persona.name || 'Unnamed Persona' }}</p>
            <p class="avatar-job">{{ persona.job || 'No job title' }}</p>
            <p class="avatar-company">{{ persona.company || 'No company' }}</p>
            <p class="avatar-tags">
              <span v-if="persona.type" class="tag">{{ persona.type }}</span>
              <span v-if="persona.industry" class="tag">{{ persona.industry }}</span>
            </p>
          </div>
        </div>

        <div class="sizes-row">
          <div v-for="s in previewSizes" :key="s" class="size-preview">
            <AvatarDisplay :persona="filledPersona" :size="s" />
            <span class="size-label">{{ s }}px</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import AvatarDisplay from './components/AvatarDisplay.vue'

const personaTypes = [
  'Decision Maker',
  'End User',
  'Technical User',
  'Administrator',
  'Manager',
  'Executive',
  'Influencer',
  'Developer',
  'Designer',
  'Business Analyst'
]

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Professional Services',
  'Media & Entertainment',
  'Transportation',
  'Energy',
  'Real Estate'
]

const previewSizes = [24, 40, 64, 100]

const persona = reactive({
  name: '',
  job: '',
  company: '',
  type: '',
  industry: ''
})

// Only pass persona to the generator when at least a name is present,
// otherwise show the default empty-state avatar.
const filledPersona = computed(() => {
  if (!persona.name && !persona.job && !persona.company) return null
  return { ...persona }
})
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: #f4f4f5;
  color: #27272a;
  line-height: 1.5;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #1e429f;
  color: #fff;
  padding: 2rem 2.5rem;
}

.app-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.app-header p {
  opacity: 0.85;
  font-size: 0.95rem;
}

.app-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem 2.5rem;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .app-main {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }
}

h2 {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #52525b;
  margin-bottom: 1rem;
}

.persona-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #3f3f46;
}

.field input,
.field select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #18181b;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
}

.field input:focus,
.field select:focus {
  border-color: #3f83f8;
  box-shadow: 0 0 0 3px rgba(63, 131, 248, 0.15);
}

.avatar-card {
  background: #fff;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.avatar-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.avatar-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #18181b;
}

.avatar-job {
  font-size: 0.9rem;
  color: #52525b;
}

.avatar-company {
  font-size: 0.85rem;
  color: #71717a;
}

.avatar-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.4rem;
}

.tag {
  font-size: 0.75rem;
  font-weight: 500;
  background: #e1effe;
  color: #1a56db;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.sizes-row {
  display: flex;
  align-items: flex-end;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.size-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.size-label {
  font-size: 0.75rem;
  color: #71717a;
}
</style>
