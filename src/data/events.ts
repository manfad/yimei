export type Event = {
  id: string;
  type: string;
  date: string;
  location: string;
  title: string;
  excerpt: string;
  body: string[];
  feature?: boolean;
};

export const events: Event[] = [
  {
    id: 'mill-collab',
    type: 'Collaboration',
    date: 'Mar 2026',
    location: 'Selangor, Malaysia',
    title: 'Joint project with regional palm oil mill',
    excerpt:
      'A collaboration to deploy a full effluent-to-reuse treatment flow at a partner mill.',
    body: [
      'We partnered with a regional palm oil mill to design and commission an end-to-end treatment flow — from inlet screening through anaerobic and aerobic stages to final water recovery.',
      "The collaboration brought our engineers on-site alongside the mill's operations team to tune the system to real effluent loads and seasonal variation. Together we set recovery targets and a monitoring routine to keep the plant compliant year-round.",
      'The result is a working reference site demonstrating that high-strength mill effluent can be treated to reuse-grade water reliably and at scale.',
    ],
    feature: true,
  },
  {
    id: 'plant-visit',
    type: 'Site Visit',
    date: 'Feb 2026',
    location: 'Yimei Facility',
    title: 'Industry delegation plant tour',
    excerpt: 'Hosting an industry delegation for a walkthrough of our treatment systems.',
    body: [
      'We welcomed an industry delegation to tour our facility and see the treatment chain in operation, stage by stage.',
      'Visitors walked the full flow — from pre-treatment and biological reactors to membrane filtration and water recovery — and discussed how modular systems can be adapted to different industrial waste streams.',
      'Site visits like this are central to how we work: seeing the process in action makes the engineering tangible.',
    ],
  },
  {
    id: 'expo',
    type: 'Exhibition',
    date: 'Nov 2025',
    location: 'Kuala Lumpur',
    title: 'Environmental technology expo',
    excerpt: 'Showcasing our latest treatment and recovery solutions at a regional expo.',
    body: [
      'Our team exhibited at a regional environmental technology expo, presenting our latest treatment and water-recovery solutions.',
      'We met mill operators, factory engineers and partners interested in closing the loop on their water use, and shared results from recent deployments.',
      'The event was a great opportunity to connect with the wider industry and discuss where wastewater treatment is heading.',
    ],
  },
  {
    id: 'partner-signing',
    type: 'Collaboration',
    date: 'Sep 2025',
    location: 'Selangor, Malaysia',
    title: 'Technology partnership signing',
    excerpt: 'Signing a partnership to bring advanced membrane technology to more sites.',
    body: [
      'We signed a partnership agreement to expand access to advanced membrane filtration and recovery technology across more industrial sites.',
      'The partnership combines complementary engineering strengths to deliver more complete, reliable treatment flows for clients.',
      'It marks an important step in scaling our impact across the region.',
    ],
  },
  {
    id: 'training',
    type: 'Site Visit',
    date: 'Jul 2025',
    location: 'Client Site',
    title: 'Operator training & commissioning',
    excerpt: "On-site commissioning and hands-on training for a client's operations team.",
    body: [
      'Our engineers spent time on a client site commissioning a newly installed treatment system and training the operations team to run it confidently.',
      'Hands-on training covered routine operation, monitoring, dosing and basic maintenance — ensuring the system keeps performing long after handover.',
      'Service and knowledge transfer are part of every Yimei project.',
    ],
  },
  {
    id: 'community',
    type: 'Collaboration',
    date: 'May 2025',
    location: 'Local Community',
    title: 'Community water awareness day',
    excerpt: 'Supporting a local initiative on water reuse and environmental protection.',
    body: [
      'We took part in a community initiative focused on water reuse and environmental protection, sharing how industry can reduce its footprint.',
      'Our team ran simple demonstrations of how wastewater can be treated and recovered, sparking conversations about cleaner industry.',
      'Engaging the wider community is part of our commitment to environmental protection.',
    ],
  },
];
