import type { QuizQuestion } from "@/components/quiz"

export type Module = {
  id: string
  title: string
  description: string
  imageAlt: string
  image: string
  checklist: string[]
  quiz: QuizQuestion[]
  tips: string[]
}

export const modules: Module[] = [
  {
    id: "earthquake",
    title: "Earthquake Preparedness",
    description: "Learn Drop-Cover-Hold, prepare a go-bag, and secure your space.",
    imageAlt: "Illustration of earthquake safety under a sturdy table",
    image: "/earthquake-preparedness-illustration.jpg",
    checklist: [
      "Create a family communication plan with emergency contacts",
      "Assemble a go-bag with water, food, flashlight, and first-aid",
      "Secure heavy furniture and water heaters to walls",
      "Identify safe spots: under sturdy furniture or against interior walls",
      "Practice Drop, Cover, and Hold On drills monthly",
    ],
    quiz: [
      {
        id: "eq1",
        question: "During an earthquake, what is the safest immediate action indoors?",
        options: [
          "Run outside immediately",
          "Stand in a doorway",
          "Drop, Cover, and Hold On",
          "Use the elevator to evacuate",
        ],
        answerIndex: 2,
        explanation: "Drop under sturdy furniture, cover your head/neck, and hold on until shaking stops.",
      },
      {
        id: "eq2",
        question: "Which item is NOT essential in a basic go-bag?",
        options: ["Flashlight", "First-aid kit", "Perishable gourmet food", "Water"],
        answerIndex: 2,
        explanation: "Pack non-perishable foods; perishable items spoil quickly during disasters.",
      },
    ],
    tips: [
      "Keep shoes by your bed to avoid injury from broken glass.",
      "Know how to shut off gas and electricity safely.",
      "After shaking stops, check for injuries and hazards before moving.",
    ],
  },
  {
    id: "flood",
    title: "Flood Safety",
    description: "Know evacuation routes, avoid floodwater, and prepare your home.",
    imageAlt: "Illustration of flood evacuation route",
    image: "/flood-evacuation-illustration.jpg",
    checklist: [
      "Identify local evacuation routes and higher ground",
      "Store important documents in waterproof containers",
      "Install check valves to prevent floodwater backflow",
      "Move valuable items to upper floors during warnings",
      'Never drive through flooded roads ("Turn Around, Don’t Drown")',
    ],
    quiz: [
      {
        id: "fl1",
        question: "How deep can water be to float and move a vehicle?",
        options: ["6 inches", "12 inches", "24 inches", "36 inches"],
        answerIndex: 2,
        explanation: "Just 24 inches of moving water can carry away most vehicles.",
      },
      {
        id: "fl2",
        question: "Best document storage method for flood preparedness?",
        options: ["On the coffee table", "In a cardboard box", "Waterproof, elevated storage", "Leave with a neighbor"],
        answerIndex: 2,
        explanation: "Waterproof, elevated storage helps protect documents from water damage.",
      },
    ],
    tips: [
      "Avoid contact with floodwater; it can be contaminated.",
      "Unplug electrical appliances if safe to do so.",
      "After a flood, photograph damage for insurance before cleanup.",
    ],
  },
  {
    id: "cyclone",
    title: "Cyclone/Storm Readiness",
    description: "Reinforce your home, stock supplies, and plan for power outages.",
    imageAlt: "Illustration of storm preparedness kit",
    image: "/storm-preparedness-kit-illustration.jpg",
    checklist: [
      "Reinforce doors and windows; consider storm shutters",
      "Stock at least 3 days of water and non-perishable food",
      "Charge power banks and keep backup batteries",
      "Trim trees and clear gutters to prevent debris damage",
      "Prepare a battery-powered radio for updates",
    ],
    quiz: [
      {
        id: "cy1",
        question: "What is a safe water supply guideline for emergencies?",
        options: [
          "1 liter per person/day",
          "2 liters per person/day",
          "3 liters per person/day",
          "1 gallon (≈3.8L) per person/day",
        ],
        answerIndex: 3,
        explanation: "Aim for about 1 gallon (≈3.8 liters) per person per day for drinking and hygiene.",
      },
      {
        id: "cy2",
        question: "Why trim trees before a storm?",
        options: [
          "Aesthetic reasons only",
          "Reduce debris and damage risk",
          "Improve radio reception",
          "Increase shade",
        ],
        answerIndex: 1,
        explanation: "Pruning reduces the chance of branches damaging property in high winds.",
      },
    ],
    tips: [
      "Fill bathtubs with water for sanitation if you expect outages.",
      "Keep your car’s gas tank at least half full before storms.",
      "Follow official advisories; don’t rely on rumors.",
    ],
  },
]
