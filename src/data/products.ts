export type Product = {
  id: string;
  cat: string;
  name: string;
  tag: string;
  bullets: string[];
  specs: [string, string][];
};

export const products: Product[] = [
  {
    id: 'screening-unit',
    cat: 'pretreatment',
    name: 'Inlet Screening Unit',
    tag: 'Removes solids and debris from incoming effluent.',
    bullets: [
      'Automated bar & fine screening',
      'Reduces downstream fouling',
      'Corrosion-resistant build',
      'Low-maintenance operation',
    ],
    specs: [
      ['Throughput', 'Up to 200 m³/h'],
      ['Screen size', '1–10 mm configurable'],
      ['Material', 'SS304 / SS316'],
      ['Drive', 'Automatic, timer or level'],
    ],
  },
  {
    id: 'equalization-tank',
    cat: 'pretreatment',
    name: 'Equalization & Buffer Tank',
    tag: 'Balances flow and load so downstream stages run steadily.',
    bullets: [
      'Smooths flow & concentration peaks',
      'Mixing to prevent settling',
      'Sized to your batch profile',
      'Integrates with dosing',
    ],
    specs: [
      ['Capacity', 'Custom, 50–1000 m³'],
      ['Mixing', 'Submersible / coarse bubble'],
      ['Level control', 'Ultrasonic'],
      ['Material', 'RC / coated steel'],
    ],
  },
  {
    id: 'oil-trap',
    cat: 'pretreatment',
    name: 'Oil & Grease Separator',
    tag: 'Captures free oils and fats common in mill effluent.',
    bullets: [
      'Gravity & coalescing separation',
      'Protects biological stages',
      'Skimming & recovery',
      'Easy access for cleaning',
    ],
    specs: [
      ['Removal', 'Free oil to <50 mg/L'],
      ['Type', 'API / coalescing plate'],
      ['Throughput', 'Configurable'],
      ['Material', 'SS / FRP'],
    ],
  },
  {
    id: 'anaerobic-reactor',
    cat: 'biological',
    name: 'Anaerobic Bioreactor',
    tag: 'High-rate digestion that slashes organic load and yields biogas.',
    bullets: [
      'Major COD reduction',
      'Biogas capture for energy',
      'Stable for high-strength POME',
      'Compact high-rate design',
    ],
    specs: [
      ['COD removal', 'Up to 85–90%'],
      ['Type', 'UASB / EGSB'],
      ['Biogas', 'Captured for reuse'],
      ['Loading', 'High-rate'],
    ],
  },
  {
    id: 'aerobic-system',
    cat: 'biological',
    name: 'Aerobic Treatment System',
    tag: 'Aerobic polishing that further reduces BOD and nutrients.',
    bullets: [
      'Reduces residual BOD/COD',
      'Activated sludge / MBBR options',
      'Efficient aeration control',
      'Reliable, proven process',
    ],
    specs: [
      ['BOD removal', 'Up to 95%'],
      ['Type', 'ASP / MBBR / SBR'],
      ['Aeration', 'Fine-bubble + blowers'],
      ['Control', 'DO-based automatic'],
    ],
  },
  {
    id: 'clarifier',
    cat: 'biological',
    name: 'Secondary Clarifier',
    tag: 'Separates treated water from biomass for a clear effluent.',
    bullets: [
      'Reliable solid–liquid separation',
      'Sludge return & wasting',
      'Low-turbidity overflow',
      'Compact footprint',
    ],
    specs: [
      ['Type', 'Lamella / circular'],
      ['Overflow', 'Low TSS'],
      ['Sludge', 'Automatic return'],
      ['Material', 'RC / steel'],
    ],
  },
  {
    id: 'uf-skid',
    cat: 'filtration',
    name: 'Ultrafiltration Skid',
    tag: 'Membrane filtration that removes fine solids and turbidity.',
    bullets: [
      'Removes fine SS & turbidity',
      'Skid-mounted, plug-and-play',
      'Automatic backwash & CIP',
      'Consistent permeate quality',
    ],
    specs: [
      ['Membrane', 'UF hollow fibre'],
      ['Turbidity out', '<0.5 NTU'],
      ['Cleaning', 'Auto backwash + CIP'],
      ['Config', 'Skid-mounted'],
    ],
  },
  {
    id: 'media-filter',
    cat: 'filtration',
    name: 'Multimedia Filter',
    tag: 'Media filtration for cost-effective polishing of treated water.',
    bullets: [
      'Sand / anthracite media beds',
      'Robust & low-cost polishing',
      'Automatic backwash',
      'Long service life',
    ],
    specs: [
      ['Media', 'Sand / anthracite'],
      ['Backwash', 'Automatic'],
      ['Throughput', 'Configurable'],
      ['Vessel', 'FRP / steel'],
    ],
  },
  {
    id: 'ro-system',
    cat: 'recovery',
    name: 'RO Recovery System',
    tag: 'Reverse osmosis that recovers high-purity water for reuse.',
    bullets: [
      'High recovery of reusable water',
      'Removes dissolved salts',
      'Energy-recovery options',
      'Automated, monitored operation',
    ],
    specs: [
      ['Recovery', 'Up to 75–95%'],
      ['Membrane', 'Spiral-wound RO'],
      ['Output', 'Reuse-grade water'],
      ['Control', 'PLC + remote'],
    ],
  },
  {
    id: 'polishing-unit',
    cat: 'recovery',
    name: 'Final Polishing Unit',
    tag: 'Final treatment to meet discharge or reuse standards.',
    bullets: [
      'Meets discharge / reuse specs',
      'Optional disinfection',
      'Activated carbon polishing',
      'Compliance-ready output',
    ],
    specs: [
      ['Output', 'Discharge / reuse grade'],
      ['Disinfection', 'UV / chlorination'],
      ['Polish', 'Activated carbon'],
      ['Footprint', 'Compact'],
    ],
  },
  {
    id: 'controller',
    cat: 'control',
    name: 'Process Control Panel',
    tag: 'PLC-based control that automates and monitors the full flow.',
    bullets: [
      'Automates the whole chain',
      'Alarms & safe interlocks',
      'Remote monitoring ready',
      'Data logging & trends',
    ],
    specs: [
      ['Control', 'PLC + HMI'],
      ['Remote', 'SCADA / cloud option'],
      ['Logging', 'Continuous'],
      ['Alarms', 'Configurable'],
    ],
  },
  {
    id: 'dosing-system',
    cat: 'control',
    name: 'Chemical Dosing System',
    tag: 'Accurate dosing of treatment chemicals across the process.',
    bullets: [
      'Precise metered dosing',
      'pH & coagulant control',
      'Multiple dosing points',
      'Safe chemical handling',
    ],
    specs: [
      ['Dosing', 'Metering pumps'],
      ['Control', 'pH / ORP feedback'],
      ['Points', 'Multi-point'],
      ['Tanks', 'Bunded, chemical-grade'],
    ],
  },
];
