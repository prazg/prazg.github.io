/**
 * Canonical verified dataset for the Central Open-Science & Clinical AI Observatory
 * Dr Prajwal Ghimire (@prazg) — https://prazg.github.io/
 *
 * Zero external dependencies. 100% browser-native ES module.
 */

export const RESEARCHER_PROFILE = Object.freeze({
  name: 'Dr Prajwal Ghimire',
  handle: '@prazg',
  headline: 'Neurosurgeon-Scientist · Cancer AI & Radiogenomics Researcher',
  affiliationsSummary:
    "Postdoctoral Researcher @ The Francis Crick Institute · PhD in AI / Cancer Imaging / Radiogenomics @ King's College London (KCL-BMEIS) · Neurosurgery @ King's College Hospital, London · Scientist @ NAAMII Nepal",
  affiliations: Object.freeze([
    {
      role: 'Postdoctoral Researcher',
      institution: 'The Francis Crick Institute',
      shortLabel: 'The Francis Crick Institute'
    },
    {
      role: 'PhD in AI / Cancer Imaging / Radiogenomics',
      institution: "King's College London (KCL-BMEIS)",
      shortLabel: 'KCL-BMEIS'
    },
    {
      role: 'Neurosurgery',
      institution: "King's College Hospital, London",
      shortLabel: "King's College Hospital"
    },
    {
      role: 'Scientist',
      institution: 'NAAMII Nepal',
      shortLabel: 'NAAMII Nepal'
    }
  ]),
  location: 'London, UK',
  email: 'prajwal.ghimire@crick.ac.uk',
  links: Object.freeze({
    portal: 'https://prazg.github.io/',
    kclPure: 'https://kclpure.kcl.ac.uk/portal/en/persons/prajwal-ghimire/',
    cv: 'https://kclpure.kcl.ac.uk/ws/portalfiles/portal/cv/b47f89d3-9947-4de3-957f-7c086e01768b?locale=en_GB',
    linktree: 'https://linktr.ee/prazneuro',
    github: 'https://github.com/prazg',
    linkedin: 'https://linkedin.com/in/neuroPraz',
    twitter: 'https://twitter.com/prazNeuro',
    youtube: 'https://youtube.com/Dr.Prajwal.Ghimire',
    instagram: 'https://instagram.com/dr.praz.neuro'
  })
});

export const ECOSYSTEM_KPIS = Object.freeze([
  {
    id: 'kpi-live-apps',
    value: '10',
    label: 'Live Clinical & AI Web Apps',
    detail: 'Neurosurgery, Neuroimaging, Oncology & Pathology',
    accent: 'cyan'
  },
  {
    id: 'kpi-foundation-models',
    value: '99',
    label: 'Curated Open Foundation Models',
    detail: '28 Brain Radiology · 55 Histology · 16 Animal Pathology',
    accent: 'rose'
  },
  {
    id: 'kpi-datasets',
    value: '44',
    label: 'Indexed Neuro Datasets & Benchmarks',
    detail: 'OpenNeuroAtlas Modality × Pathology Observatory',
    accent: 'emerald'
  },
  {
    id: 'kpi-open-source',
    value: '100%',
    label: 'Open-Source Code',
    detail: 'Browser-Local Sandboxes & Self-Hosted GPU Runners',
    accent: 'amber'
  }
]);

export const CATEGORY_FILTERS = Object.freeze([
  { id: 'all', label: 'All 10 Apps' },
  { id: 'neurosurgery-anatomy', label: 'Neurosurgery & 3D Anatomy' },
  { id: 'imaging-response', label: 'Imaging & Clinical Response' },
  { id: 'foundation-models', label: 'Foundation Models' },
  { id: 'classification-rigor', label: 'Classification & AI Rigor' },
  { id: 'datasets-trials', label: 'Datasets & Clinical Trials' }
]);

export const RUNTIME_FILTERS = Object.freeze([
  { id: 'all', label: 'All Runtimes' },
  { id: 'browser-local', label: 'Browser-Local Zero-Upload' },
  { id: 'gpu-portal', label: 'GPU Model Portals' },
  { id: 'registry-web', label: 'Open Registries & Trials' }
]);

export const WORKFLOW_GOALS = Object.freeze([
  {
    id: 'goal-nifti-rano',
    step: '01',
    title: 'Measure NIfTI Tumor Volumes, EOR & RANO 2.0',
    domainLabel: 'Volumetrics & Radiological Response',
    accent: 'cyan',
    iconId: 'mri-calipers',
    recommendedIds: ['neuroscope-rano', 'remote-dicom-viewer'],
    workflowTip:
      'Open NIfTI-1 segmentations directly in NeuroScope-RANO (100% browser-local, zero upload) for BraTS sub-compartment volumetrics, automated 2D RANO calipers, RANO-Resect (Karschnia 2023) EOR grading, longitudinal RANO 2.0 tracking, and Dice/HD95/ASSD QA — or inspect raw .dcm series in the Remote DICOM Viewer local sandbox.'
  },
  {
    id: 'goal-foundation-models',
    step: '02',
    title: 'Run Open-Weight Brain MRI or Histology Foundation Models',
    domainLabel: '99 Open-Weight Radiology & Pathology FMs',
    accent: 'rose',
    iconId: 'fm-stack',
    recommendedIds: [
      'brain-radiology-fm-portal',
      'histology-fm-portal',
      'animal-pathology-fm-portal'
    ],
    workflowTip:
      'Benchmark architectures, verified DOIs, and VRAM requirements across 28 Brain MRI/CT/PET/4D fMRI models, 55 clinical & preclinical histology encoders/VLMs, and 16 rodent/GEMM toxicologic pathology models, then pair the static frontend with the self-hosted local GPU runner so imaging and WSI slides remain on-premise.'
  },
  {
    id: 'goal-surgical-corridors',
    step: '03',
    title: 'Plan 3D Surgical Corridors & Study Rhoton Neuroanatomy',
    domainLabel: 'Stereotactic Trajectories & Microsurgical Dissection',
    accent: 'emerald',
    iconId: 'stereotactic-arc',
    recommendedIds: ['neurocorridor-3d', '3d-neurosurgical-atlas'],
    workflowTip:
      'Use NeuroCorridor-3D to evaluate entry-to-target trajectories in 60fps MNI-152 space against 11 eloquent/vascular structures and 10 DTI fiber tracts with Probe’s-Eye fly-throughs, alongside the 3D Neurosurgical Atlas for 29 GLB craniospinal specimens (2,031 meshes), 76 step-by-step surgical approaches, and 102 Rhoton stereo plates.'
  },
  {
    id: 'goal-datasets-benchmarks',
    step: '04',
    title: 'Discover Open Neuro Datasets & MICCAI Benchmarks',
    domainLabel: 'Cohorts, Gap Heatmaps & BibTeX Registry',
    accent: 'amber',
    iconId: 'atlas-grid',
    recommendedIds: ['openneuroatlas'],
    workflowTip:
      'Explore OpenNeuroAtlas across 44 verified open-access neurosurgery, neuroimaging, and neuro-oncology datasets and MICCAI challenges. Use the interactive Modality × Pathology gap heatmap and side-by-side cohort comparator to select external validation sets and export structured BibTeX citations.'
  },
  {
    id: 'goal-cns5-audit',
    step: '05',
    title: 'Classify CNS5 Tumors & Audit AI Papers for Leakage',
    domainLabel: 'WHO CNS5 (2021) + CLAIM 2024 / TRIPOD+AI',
    accent: 'cyan',
    iconId: 'audit-shield',
    recommendedIds: ['cns5-audit'],
    workflowTip:
      'Run integrated molecular-histological WHO CNS5 (2021) tumor classification across 7 CNS tumor families alongside RANO 2.0 / RANO-BM / RANO-Resect calculators, and audit neuroimaging AI studies with the 36-item CLAIM 2024 + TRIPOD+AI leakage checklist with instant Markdown, LaTeX, or PDF export.'
  },
  {
    id: 'goal-clinical-trials',
    step: '06',
    title: 'Search Recruiting Brain Tumor Clinical Trials',
    domainLabel: 'Multi-Registry Neuro-Oncology Trial Discovery',
    accent: 'emerald',
    iconId: 'trials-compass',
    recommendedIds: ['brain-trials-finder'],
    workflowTip:
      'Search daily-refreshed, actively recruiting neuro-oncology studies harmonized across ClinicalTrials.gov, ISRCTN, EU CTIS, and WHO ICTRP using diagnosis presets and transparent patient-fit heuristics, then export a shortlist or printable clinic discussion sheet.'
  }
]);

export const NEURO_AI_APPS = Object.freeze([
  {
    id: 'neuroscope-rano',
    order: 1,
    name: 'NeuroScope-RANO',
    liveUrl: 'https://prazg.github.io/neuroscope-rano/',
    repoUrl: 'https://github.com/prazg/neuroscope-rano',
    category: 'Imaging & Clinical Response',
    categoryId: 'imaging-response',
    runtimeGroup: 'browser-local',
    privacyRuntime: '100% Browser-Local (Zero Upload)',
    accent: 'cyan',
    iconId: 'mri-calipers',
    summary:
      'Multi-planar + 3D NIfTI-1 MRI workbench for BraTS tumor volumetrics, automated 2D RANO calipers, RANO-Resect (Karschnia 2023) EOR classification, longitudinal RANO 2.0 tracking, and AI segmentation QA (Dice, HD95, ASSD, 3D TP/FP/FN overlay).',
    capabilities: [
      'MPR + 3D NIfTI-1',
      'BraTS Volumetrics',
      'RANO 2.0 & RANO-Resect EOR',
      'Dice / HD95 / ASSD QA',
      'Zero Upload'
    ]
  },
  {
    id: 'openneuroatlas',
    order: 2,
    name: 'OpenNeuroAtlas',
    liveUrl: 'https://prazg.github.io/openneuroatlas/',
    repoUrl: 'https://github.com/prazg/openneuroatlas',
    category: 'Datasets & Benchmarks',
    categoryId: 'datasets-trials',
    runtimeGroup: 'registry-web',
    privacyRuntime: 'Static Open Registry (PR-Extensible)',
    accent: 'amber',
    iconId: 'atlas-grid',
    summary:
      'Living observatory cataloging 44 verified open-access datasets, foundation models, clinical toolkits, and MICCAI challenges across neurosurgery, neuroimaging, and neuro-oncology, with interactive Modality x Pathology gap heatmaps, comparator, and BibTeX/PR builder.',
    capabilities: [
      '44 Open Datasets',
      'MICCAI Benchmarks',
      'Modality × Pathology Heatmap',
      'Cohort Comparator',
      'BibTeX & PR Builder'
    ]
  },
  {
    id: 'cns5-audit',
    order: 3,
    name: 'CNS5-Audit',
    liveUrl: 'https://prazg.github.io/cns5-audit/',
    repoUrl: 'https://github.com/prazg/cns5-audit',
    category: 'Classification & AI Rigor',
    categoryId: 'classification-rigor',
    runtimeGroup: 'browser-local',
    privacyRuntime: '100% Browser-Local (Zero PHI)',
    accent: 'cyan',
    iconId: 'audit-shield',
    summary:
      'Integrated WHO CNS5 (2021) molecular-histological tumor classifier across 7 CNS tumor families, RANO 2.0 / RANO-BM / RANO-Resect calculators, and a 36-item CLAIM 2024 + TRIPOD+AI neuroimaging leakage auditor with Markdown/LaTeX/PDF export.',
    capabilities: [
      'WHO CNS5 (2021) Classifier',
      'RANO 2.0 / BM / Resect',
      '36-Item Leakage Auditor',
      'CLAIM 2024 + TRIPOD+AI',
      'MD / LaTeX / PDF Export'
    ]
  },
  {
    id: 'neurocorridor-3d',
    order: 4,
    name: 'NeuroCorridor-3D',
    liveUrl: 'https://prazg.github.io/neurocorridor-3d/',
    repoUrl: 'https://github.com/prazg/neurocorridor-3d',
    category: 'Neurosurgery & 3D Anatomy',
    categoryId: 'neurosurgery-anatomy',
    runtimeGroup: 'browser-local',
    privacyRuntime: '100% Browser-Local (60fps MNI-152)',
    accent: 'emerald',
    iconId: 'stereotactic-arc',
    summary:
      "Interactive stereotactic MNI-152 sandbox with 11 eloquent/vascular structures, 10 white-matter fiber tracts (Anatomical & DTI DEC RGB), 5 surgical cases, Probe's-Eye corridor fly-through, deterministic entry optimizer, local NIfTI overlay, and 10-question quiz.",
    capabilities: [
      'MNI-152 Stereotaxy',
      '10 DTI White-Matter Tracts',
      "Probe's-Eye Fly-Through",
      'Deterministic Entry Optimizer',
      'Local NIfTI Overlay'
    ]
  },
  {
    id: '3d-neurosurgical-atlas',
    order: 5,
    name: '3D Neurosurgical Atlas',
    liveUrl: 'https://prazg.github.io/3D_Neurosurgical_Atlas/',
    repoUrl: 'https://github.com/prazg/3D_Neurosurgical_Atlas',
    category: 'Neurosurgery & 3D Anatomy',
    categoryId: 'neurosurgery-anatomy',
    runtimeGroup: 'browser-local',
    privacyRuntime: 'WebGL2 Desktop & Mobile Viewers',
    accent: 'emerald',
    iconId: 'cranial-mesh',
    summary:
      'Interactive browser-based 3D craniospinal anatomy & neuro-oncological pathology teaching atlas featuring 29 GLB specimens (2,031 meshes), 76 step-by-step surgical approaches/syndromes/dissections, 12 MNI layers, and 102 Rhoton stereo plates.',
    capabilities: [
      '29 GLB Specimens (2,031 Meshes)',
      '76 Surgical Approaches',
      '12 MNI Layers',
      '102 Rhoton Stereo Plates',
      'WebGL2 Desktop & Mobile'
    ]
  },
  {
    id: 'brain-trials-finder',
    order: 6,
    name: 'Brain Trials Finder',
    liveUrl: 'https://prazg.github.io/brain_trials_finder/',
    repoUrl: 'https://github.com/prazg/brain_trials_finder',
    category: 'Clinical Trials & Oncology',
    categoryId: 'datasets-trials',
    runtimeGroup: 'registry-web',
    privacyRuntime: 'Daily Refreshed Multi-Registry Web App',
    accent: 'amber',
    iconId: 'trials-compass',
    summary:
      'Discovers actively recruiting neuro-oncology clinical trials across ClinicalTrials.gov, ISRCTN, EU CTIS, and WHO ICTRP with explainable patient-fit heuristics, diagnosis presets, shortlist export, and printable clinic discussion sheets.',
    capabilities: [
      '4 International Trial Registries',
      'Explainable Fit Heuristics',
      'Neuro-Oncology Presets',
      'Shortlist Export',
      'Clinic Discussion Sheets'
    ]
  },
  {
    id: 'brain-radiology-fm-portal',
    order: 7,
    name: 'Brain Radiology FM Portal',
    liveUrl: 'https://prazg.github.io/Brain_Radiology_FM_Portal/',
    repoUrl: 'https://github.com/prazg/Brain_Radiology_FM_Portal',
    category: 'Foundation Models',
    categoryId: 'foundation-models',
    runtimeGroup: 'gpu-portal',
    privacyRuntime: 'Static PACS Bench + Self-Hosted GPU Runner',
    accent: 'rose',
    iconId: 'brain-fm',
    summary:
      'Interactive PACS portal and local GPU server for 28 open-weight 3D Brain MRI, Head CT, PET, and 4D fMRI foundation models — supporting volumetric embeddings, BrainAge, triage/report VLMs, 3D segmentation, synthesis, model comparison, and verified DOIs.',
    capabilities: [
      '28 Brain MRI / CT / PET / fMRI FMs',
      'Volumetric Embeddings & VLMs',
      '3D Segmentation & Synthesis',
      'Self-Hosted GPU Server',
      'Verified DOIs'
    ]
  },
  {
    id: 'histology-fm-portal',
    order: 8,
    name: 'Histology FM Portal',
    liveUrl: 'https://prazg.github.io/Histology_FM_Portal/',
    repoUrl: 'https://github.com/prazg/Histology_FM_Portal',
    category: 'Foundation Models',
    categoryId: 'foundation-models',
    runtimeGroup: 'gpu-portal',
    privacyRuntime: 'Static Slide Bench + Self-Hosted GPU Runner',
    accent: 'rose',
    iconId: 'histology-wsi',
    summary:
      'Graphical frontend and self-hosted GPU runner for 55 open-weight clinical and preclinical histology foundation models plus 39 oncology datasets — covering patch/slide encoders, zero-shot VLMs, virtual multiplex, spatial transcriptomics, and side-by-side encoder comparison.',
    capabilities: [
      '55 Histology Foundation Models',
      '39 Oncology Datasets',
      'Patch / Slide Encoders & VLMs',
      'Spatial Transcriptomics',
      'Side-by-Side Comparator'
    ]
  },
  {
    id: 'animal-pathology-fm-portal',
    order: 9,
    name: 'Animal Pathology FM Portal',
    liveUrl: 'https://prazg.github.io/Animal_Pathology_FM_Portal/',
    repoUrl: 'https://github.com/prazg/Animal_Pathology_FM_Portal',
    category: 'Foundation Models',
    categoryId: 'foundation-models',
    runtimeGroup: 'gpu-portal',
    privacyRuntime: 'Static Slide Bench + Local GPU Runner',
    accent: 'rose',
    iconId: 'preclinical-scope',
    summary:
      'Interactive portal and local runner for 16 preclinical, rodent (mouse/rat), GEMM oncology, and toxicologic pathology foundation models with VRAM hardware profiling, Brightfield/Darkfield viewers, and comparator.',
    capabilities: [
      '16 Preclinical & GEMM FMs',
      'Rodent & Toxicologic Pathology',
      'VRAM Hardware Profiling',
      'Brightfield / Darkfield Viewers',
      'Local GPU Runner'
    ]
  },
  {
    id: 'remote-dicom-viewer',
    order: 10,
    name: 'Remote DICOM Viewer',
    liveUrl: 'https://prazg.github.io/Remote_Dicom_Viewer/',
    repoUrl: 'https://github.com/prazg/Remote_Dicom_Viewer',
    category: 'Imaging & Clinical Response',
    categoryId: 'imaging-response',
    runtimeGroup: 'browser-local',
    privacyRuntime: 'Authenticated TOTP Reporting + Zero-Upload Local DICOM Sandbox',
    accent: 'cyan',
    iconId: 'dicom-sandbox',
    summary:
      'Secure radiological DICOM reporting web platform featuring a 100% browser-local Zero-Upload DICOM Sandbox (built-in 48-slice Brain MRI + Head CT phantom, local .dcm folder reader, MPR reslicing, W/L presets, mm ruler, and tag inspector).',
    capabilities: [
      'Zero-Upload DICOM Sandbox',
      '48-Slice MRI + CT Phantom',
      'Local .dcm Folder Reader',
      'MPR Reslicing & W/L Presets',
      'TOTP Secure Reporting'
    ]
  }
]);

export const RADIOGENOMICS_REPOS = Object.freeze([
  {
    id: 'decipher-gbm',
    name: 'DECIPHER-GBM',
    repoUrl: 'https://github.com/prazg/DECIPHER-GBM',
    domain: 'Hybrid Deep Learning Radiogenomics',
    accent: 'cyan',
    iconId: 'radiogenomics-dna',
    summary:
      'Learning glioblastoma immune phenotypes from whole-brain MRI using a hybrid deep learning radiogenomic framework.',
    tags: ['Glioblastoma', 'Whole-Brain MRI', 'Immune Phenotypes', 'Hybrid Deep Learning']
  },
  {
    id: 'precise-gbm',
    name: 'PRECISE_GBM',
    repoUrl: 'https://github.com/prazg/PRECISE_GBM',
    domain: 'Multi-Modal Radiomics × Transcriptomics',
    accent: 'rose',
    iconId: 'immune-signature',
    summary:
      'Predictive Radiomics for Evaluation of Cancer Immune Signature in Glioblastoma integrating MRI radiomics, genomics, and immune signatures.',
    tags: ['Predictive Radiomics', 'Genomics', 'Cancer Immune Signature', 'GBM']
  },
  {
    id: 'precise-gan',
    name: 'PRECISE-GAN',
    repoUrl: 'https://github.com/prazg/PRECISE-GAN',
    domain: 'Generative Neuroimaging Synthesis',
    accent: 'amber',
    iconId: 'synth-gan',
    summary: 'Synthetic FLAIR brain MRI generation pipeline using GANs.',
    tags: ['Synthetic FLAIR', 'Generative Adversarial Networks', 'Brain MRI Synthesis']
  },
  {
    id: 'deep-features-nifti-network-den',
    name: 'Deep-Features-Nifti-Network-DEN',
    repoUrl: 'https://github.com/prazg/Deep-Features-Nifti-Network-DEN',
    domain: '3D Volumetric CNN Feature Extraction',
    accent: 'cyan',
    iconId: 'nifti-cnn',
    summary:
      'Deep Extraction Network (CNN) extracting deep volumetric features from NIfTI MRI scans of segmented glioblastomas.',
    tags: ['3D CNN', 'NIfTI Volumetric Features', 'Segmented Glioblastoma']
  },
  {
    id: 'neuroonc-proms',
    name: 'NeuroOnc_PROMs',
    repoUrl: 'https://github.com/prazg/NeuroOnc_PROMs',
    domain: 'Clinical Neuro-Oncology Outcomes',
    accent: 'emerald',
    iconId: 'proms-heart',
    summary:
      "Patient-reported outcome and experience measures (PROMs/PREMs) for neuro-oncology patients developed at King's College Hospital, London.",
    tags: ['PROMs / PREMs', 'Neuro-Oncology', "King's College Hospital"]
  }
]);

export const NEPAL_PORTALS = Object.freeze([
  {
    id: 'nepal-traya',
    name: 'Nepal TRAYA',
    liveUrl: 'https://prazg.github.io/Nepal_TRAYA/',
    repoUrl: 'https://github.com/prazg/Nepal_TRAYA',
    domain: 'Multi-Hazard Early Warning',
    accent: 'amber',
    iconId: 'hazard-radar',
    summary:
      'Multi-Hazard Early Warning System for earthquakes, floods, and landslides across Nepal.',
    tags: ['Earthquakes', 'Floods & Landslides', 'Early Warning System']
  },
  {
    id: 'nepal-quake-watch',
    name: 'Nepal Quake Watch',
    liveUrl: 'https://prazg.github.io/Nepal_Quake_Watch/',
    repoUrl: 'https://github.com/prazg/Nepal_Quake_Watch',
    domain: 'Seismic Telemetry & Hospital Exposure',
    accent: 'rose',
    iconId: 'seismo-wave',
    summary:
      'Live earthquake monitoring integrating USGS + NEMRC catalogues, ShakeMap intensity, and ward-level population/hospital exposure.',
    tags: ['USGS + NEMRC', 'ShakeMap Intensity', 'Ward & Hospital Exposure']
  },
  {
    id: 'nepal-cryosphere-inventory',
    name: 'Nepal Cryosphere Inventory',
    liveUrl: 'https://prazg.github.io/Nepal_Cryosphere_Inventory/',
    repoUrl: 'https://github.com/prazg/Nepal_Cryosphere_Inventory',
    domain: 'Glaciers & Glacial Lake Observatory',
    accent: 'cyan',
    iconId: 'glacier-peak',
    summary:
      'Open, rebuildable inventory of 4,480 glaciers and 1,429 glacial lakes in Nepal with ice velocity and outburst flood records.',
    tags: ['4,480 Glaciers', '1,429 Glacial Lakes', 'Ice Velocity & Outbursts']
  },
  {
    id: 'nepal-heritage-catalogue',
    name: 'Nepal Heritage Catalogue',
    liveUrl: 'https://prazg.github.io/Nepal_Heritage_Catalogue/',
    repoUrl: 'https://github.com/prazg/Nepal_Heritage_Catalogue',
    domain: 'Cultural Archives & Repatriation',
    accent: 'emerald',
    iconId: 'heritage-arch',
    summary:
      'Searchable catalogue of Nepalese cultural objects, manuscripts, and archives held outside Nepal with repatriation tracking.',
    tags: ['Cultural Objects', 'Manuscripts & Archives', 'Repatriation Tracking']
  },
  {
    id: 'hma-glof-dashboard',
    name: 'HMA GLOF Dashboard',
    liveUrl: 'https://prazg.github.io/GLOF_dashboard/',
    repoUrl: 'https://github.com/prazg/GLOF_dashboard',
    domain: 'High Mountain Asia Cryo-Hazards',
    accent: 'cyan',
    iconId: 'glof-basin',
    summary:
      'Interactive review of glacial lake outburst floods across High Mountain Asia.',
    tags: ['High Mountain Asia', 'GLOF Review', 'Interactive Geohazard Map']
  }
]);

export const DOMAIN_ICONS = Object.freeze({
  'mri-calipers': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5"/><ellipse cx="12" cy="12" rx="5" ry="6.2"/><line x1="3.5" y1="12" x2="20.5" y2="12"/><line x1="12" y1="3.5" x2="12" y2="20.5"/><circle cx="14.2" cy="9.8" r="1.8"/></svg>`,
  'atlas-grid': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><line x1="9.2" y1="3.5" x2="9.2" y2="20.5"/><line x1="14.8" y1="3.5" x2="14.8" y2="20.5"/><line x1="3.5" y1="9.2" x2="20.5" y2="9.2"/><line x1="3.5" y1="14.8" x2="20.5" y2="14.8"/><rect x="9.2" y="9.2" width="5.6" height="5.6" fill="currentColor" fill-opacity="0.24"/></svg>`,
  'audit-shield': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3L19.5 6.2V11.8C19.5 16.4 16.3 19.8 12 21.2C7.7 19.8 4.5 16.4 4.5 11.8V6.2L12 3Z"/><path d="M8.8 12.2L11.1 14.5L15.5 9.8"/></svg>`,
  'stereotactic-arc': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4.5 17.5C4.5 10.6 7.9 5.5 12 5.5C16.1 5.5 19.5 10.6 19.5 17.5"/><line x1="3" y1="17.5" x2="21" y2="17.5"/><line x1="17.8" y1="4.2" x2="11.6" y2="14.2"/><circle cx="11.6" cy="14.2" r="2.1"/><circle cx="17.8" cy="4.2" r="1.2"/></svg>`,
  'cranial-mesh': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3.5L19.5 7.8V16.2L12 20.5L4.5 16.2V7.8L12 3.5Z"/><path d="M12 3.5V12M19.5 7.8L12 12M4.5 7.8L12 12M12 12V20.5"/></svg>`,
  'trials-compass': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5"/><polygon points="15.8,8.2 13.5,13.5 8.2,15.8 10.5,10.5"/><circle cx="12" cy="12" r="1.1"/></svg>`,
  'brain-fm': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M9.5 4.5C7.3 4.5 5.6 6.1 5.6 8.2C4.4 8.9 3.8 10.2 3.8 11.7C3.8 13.7 5.2 15.3 7.1 15.7C7.5 17.6 9.2 19 11.2 19H12V4.5H9.5Z"/><path d="M14.5 4.5C16.7 4.5 18.4 6.1 18.4 8.2C19.6 8.9 20.2 10.2 20.2 11.7C20.2 13.7 18.8 15.3 16.9 15.7C16.5 17.6 14.8 19 12.8 19H12"/><circle cx="8.5" cy="10.5" r="1"/><circle cx="15.5" cy="10.5" r="1"/><line x1="8.5" y1="10.5" x2="15.5" y2="10.5"/></svg>`,
  'histology-wsi': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="6.5" width="18" height="11" rx="2"/><circle cx="12" cy="12" r="3.6"/><circle cx="10.9" cy="11.2" r="0.8" fill="currentColor"/><circle cx="13.2" cy="12.7" r="0.8" fill="currentColor"/><line x1="6.2" y1="6.5" x2="6.2" y2="17.5"/><line x1="17.8" y1="6.5" x2="17.8" y2="17.5"/></svg>`,
  'preclinical-scope': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10 4H14L13 10.5H11L10 4Z"/><path d="M14 8.5C17.2 9.4 19 12.2 19 15.5C19 17.8 17.6 19.5 15.5 20.2"/><line x1="6" y1="20.2" x2="18" y2="20.2"/><line x1="8" y1="14" x2="15.5" y2="14"/></svg>`,
  'dicom-sandbox': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3.5" y="4" width="17" height="16" rx="2.2"/><path d="M7.5 8H10M7.5 16H10M16.5 8H14M16.5 16H14"/><circle cx="12" cy="12" r="2.8"/></svg>`,
  'fm-stack': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="12,3.5 20,7.8 12,12.1 4,7.8"/><polyline points="4,12.2 12,16.5 20,12.2"/><polyline points="4,16.4 12,20.5 20,16.4"/></svg>`,
  'radiogenomics-dna': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 4C7 9.5 17 9.5 17 15C17 17.8 15 19.5 12 20.5"/><path d="M17 4C17 9.5 7 9.5 7 15C7 17.8 9 19.5 12 20.5"/><line x1="8.5" y1="6.8" x2="15.5" y2="6.8"/><line x1="8.5" y1="13.2" x2="15.5" y2="13.2"/></svg>`,
  'immune-signature': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4.2"/><line x1="12" y1="3.5" x2="12" y2="7.8"/><line x1="12" y1="16.2" x2="12" y2="20.5"/><line x1="3.5" y1="12" x2="7.8" y2="12"/><line x1="16.2" y1="12" x2="20.5" y2="12"/><circle cx="12" cy="3.5" r="1"/><circle cx="12" cy="20.5" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="20.5" cy="12" r="1"/></svg>`,
  'synth-gan': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3.5" y="5.5" width="7" height="13" rx="1.5"/><rect x="13.5" y="5.5" width="7" height="13" rx="1.5"/><path d="M10.5 12H13.5"/><polyline points="12,10.3 13.7,12 12,13.7"/></svg>`,
  'nifti-cnn': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="4" y="6" width="9" height="9" rx="1.5"/><rect x="11" y="9" width="9" height="9" rx="1.5"/><line x1="4" y1="6" x2="11" y2="9"/><line x1="13" y1="6" x2="20" y2="9"/><line x1="4" y1="15" x2="11" y2="18"/></svg>`,
  'proms-heart': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 20.2C12 20.2 4.5 15.4 4.5 9.6C4.5 7 6.5 5 9 5C10.5 5 11.5 5.8 12 6.8C12.5 5.8 13.5 5 15 5C17.5 5 19.5 7 19.5 9.6C19.5 15.4 12 20.2 12 20.2Z"/><polyline points="8.2,12 10.6,12 11.8,9.8 13.3,14.2 14.5,12 16.2,12"/></svg>`,
  'hazard-radar': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><line x1="12" y1="12" x2="18" y2="6"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor"/></svg>`,
  'seismo-wave': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="2.5,12 6.5,12 8.5,6.5 11,18 13.5,4.5 16,15.5 18,12 21.5,12"/></svg>`,
  'glacier-peak': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="3,19 10,6.5 14.5,13.5 17.5,9.5 21,19"/><polyline points="7.7,10.6 10,12 12.2,10.2"/></svg>`,
  'heritage-arch': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19.5H19"/><path d="M6.5 19.5V10.5L12 5.5L17.5 10.5V19.5"/><path d="M10 19.5V14C10 12.9 10.9 12 12 12C13.1 12 14 12.9 14 14V19.5"/><line x1="12" y1="3" x2="12" y2="5.5"/></svg>`,
  'glof-basin': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="3,14.5 8.5,6.5 13,12.5 17,8 21,14.5"/><path d="M3.5 17.5C6 16 8.5 19 11 17.5C13.5 16 16 19 18.5 17.5C19.5 16.9 20.3 17 21 17.5"/></svg>`
});

/**
 * Generates a complete, copy-ready Markdown directory of the Open-Science & Clinical AI Observatory
 * suitable for lab wikis, teaching syllabi, or research group handbooks.
 */
export function buildMarkdownDirectory() {
  const lines = [
    `# Open-Science & Clinical AI Observatory — ${RESEARCHER_PROFILE.name} (${RESEARCHER_PROFILE.handle})`,
    '',
    `> **Central Observatory:** ${RESEARCHER_PROFILE.links.portal}`,
    `> **Author:** ${RESEARCHER_PROFILE.name} — ${RESEARCHER_PROFILE.headline}`,
    `> **Affiliations:** ${RESEARCHER_PROFILE.affiliationsSummary}`,
    `> **Academic Profile (KCL Pure):** ${RESEARCHER_PROFILE.links.kclPure} | **GitHub:** ${RESEARCHER_PROFILE.links.github}`,
    '',
    '## 1. Live Open Neuro, Neuroimaging & Pathology AI Web Applications (10 Apps)',
    ''
  ];

  for (const app of NEURO_AI_APPS) {
    lines.push(
      `${app.order}. **[${app.name}](${app.liveUrl})** ([GitHub Repo](${app.repoUrl})) — *${app.category}* · \`${app.privacyRuntime}\``,
      `   - ${app.summary}`
    );
  }

  lines.push('', '## 2. Radiogenomics & Glioblastoma Research Frameworks', '');
  for (const repo of RADIOGENOMICS_REPOS) {
    lines.push(`- **[${repo.name}](${repo.repoUrl})** (*${repo.domain}*): ${repo.summary}`);
  }

  lines.push('', '## 3. Independent Nepal Open-Science & Multi-Hazard Portals', '');
  for (const portal of NEPAL_PORTALS) {
    lines.push(
      `- **[${portal.name}](${portal.liveUrl})** ([GitHub Repo](${portal.repoUrl})): ${portal.summary}`
    );
  }

  lines.push(
    '',
    '---',
    '*Notice: Research & Educational Open-Source Software (MIT License, Non-SaMD). Not intended for primary clinical diagnosis or unsupervised patient care.*'
  );

  return lines.join('\n');
}

/**
 * Generates a BibTeX citation entry for referencing the Central Open-Science & Clinical AI Observatory.
 */
export function buildBibtexCitation() {
  return [
    '@software{ghimire2026_clinical_ai_observatory,',
    '  author       = {Ghimire, Prajwal},',
    '  title        = {{PrazG Central Open-Science \\& Clinical AI Observatory: Open Neurosurgery, Neuroimaging, Oncology \\& Pathology AI Suite}},',
    '  year         = {2026},',
    '  url          = {https://prazg.github.io/},',
    '  note         = {The Francis Crick Institute; King\\textquotesingle s College London (KCL-BMEIS); King\\textquotesingle s College Hospital; NAAMII Nepal. Open-source research software (MIT License, Non-SaMD)}',
    '}'
  ].join('\n');
}

/**
 * Generates an APA/Nature-style plain-text software reference.
 */
export function buildPlainTextCitation() {
  return `Ghimire, P. (2026). Central Open-Science & Clinical AI Observatory: 10 Live Open Neuro, Neuroimaging & Pathology AI Web Applications, Radiogenomics Frameworks & Multi-Hazard Portals [Open-source software]. The Francis Crick Institute & King's College London. https://prazg.github.io/`;
}
