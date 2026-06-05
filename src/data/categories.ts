export type Category = {
  id: string;
  no: string;
  name: string;
  desc: string;
};

export const categories: Category[] = [
  {
    id: 'pretreatment',
    no: '01',
    name: 'Pre-treatment',
    desc: 'Capture, screening and conditioning to prepare raw effluent for treatment.',
  },
  {
    id: 'biological',
    no: '02',
    name: 'Biological Treatment',
    desc: 'Anaerobic and aerobic systems that break down organic load and cut COD/BOD.',
  },
  {
    id: 'filtration',
    no: '03',
    name: 'Filtration & Membrane',
    desc: 'Media and membrane filtration that polish the stream to a clear output.',
  },
  {
    id: 'recovery',
    no: '04',
    name: 'Water Recovery & Reuse',
    desc: 'Polishing and recovery units that return water clean enough to reuse.',
  },
  {
    id: 'control',
    no: '05',
    name: 'Monitoring & Control',
    desc: 'Sensors, dosing and controls that keep the whole flow running and compliant.',
  },
];

export function categoryName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? '';
}
