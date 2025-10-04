import { notFound } from "next/navigation"
import { modules } from "@/lib/modules"
import { Checklist } from "@/components/checklist"
import { GradientBox } from "@/components/gradient-box"
import Link from "next/link"

const EDUCATION: Record<
  string,
  {
    about: string
    before: string[]
    during: string[]
    after: string[]
    kit: string[]
    resources: { label: string; href: string }[]
  }
> = {
  earthquake: {
    about:
      "Earthquakes are sudden shaking of the ground caused by movement of the Earth’s tectonic plates. Shaking can cause buildings and infrastructure to fail, creating secondary hazards like fires and landslides.",
    before: [
      "Identify safe spots in each room: under sturdy furniture and against interior walls",
      "Secure heavy furniture and water heaters to walls; move heavy items to lower shelves",
      "Prepare a family communication plan and practice drop–cover–hold on",
    ],
    during: [
      "Drop to your hands and knees, cover your head and neck under sturdy furniture, and hold on",
      "Stay indoors until the shaking stops; if outdoors, move away from buildings, trees, and power lines",
      "If in a vehicle, pull over safely and avoid bridges and overpasses",
    ],
    after: [
      "Expect aftershocks; check yourself and others for injuries",
      "Inspect for gas leaks and structural damage; do not use open flames",
      "Listen to local authorities and only re-enter damaged buildings if cleared",
    ],
    kit: [
      "Water (4 liters per person per day, 3 days)",
      "Non-perishable food (3-day supply) and manual can opener",
      "First aid kit, medications, and copies of important documents",
      "Flashlight, extra batteries, whistle, and multi-tool",
      "Sturdy shoes, gloves, and dust mask",
    ],
    resources: [
      { label: "USGS Earthquake Hazards", href: "https://www.usgs.gov/programs/earthquake-hazards" },
      { label: "Ready.gov Earthquakes", href: "https://www.ready.gov/earthquakes" },
    ],
  },
  flood: {
    about:
      "Floods occur when water overflows onto normally dry land from heavy rain, river surge, coastal storm surge, or dam failure. Flash floods can happen quickly with little warning.",
    before: [
      "Know your flood risk and evacuation routes; sign up for local alerts",
      "Move valuables and electronics above potential flood level",
      "Have sandbags or barriers ready if advised by authorities",
    ],
    during: [
      "Turn around, don’t drown: never walk or drive through flood waters",
      "Move to higher ground immediately; follow evacuation orders",
      "Avoid downed power lines and fast-moving water",
    ],
    after: [
      "Avoid entering buildings surrounded by floodwater until declared safe",
      "Assume floodwater is contaminated; wear protective gear and disinfect surfaces",
      "Document damage with photos for insurance; beware of mold growth",
    ],
    kit: [
      "Waterproof bags for documents, batteries, and electronics",
      "Portable phone charger/power bank",
      "Water purification tablets or filter",
      "Rubber boots and gloves",
      "Battery-powered or hand-crank radio",
    ],
    resources: [
      { label: "NOAA Flood Safety", href: "https://www.weather.gov/safety/flood" },
      { label: "Ready.gov Floods", href: "https://www.ready.gov/floods" },
    ],
  },
  cyclone: {
    about:
      "Cyclones (hurricanes/typhoons) are powerful storms with high winds, heavy rain, and storm surge that can cause coastal and inland flooding and wind damage.",
    before: [
      "Know your evacuation zone and plan; prepare to secure windows and doors",
      "Trim trees and bring outdoor items inside",
      "Fuel vehicles and charge devices; stock up on water and food",
    ],
    during: [
      "Shelter in an interior room away from windows or evacuate if ordered",
      "Avoid flooded roads and stay off bridges over fast-moving water",
      "Monitor official alerts for changes and all-clear notices",
    ],
    after: [
      "Watch out for downed lines and unstable structures",
      "Use generators outdoors only and far from windows",
      "Photograph damage and contact your insurer; boil water if advised",
    ],
    kit: [
      "Window/door storm protection (shutters, plywood, tape)",
      "7-day supply of water and shelf-stable food",
      "First aid kit, medications, and infant/elder supplies as needed",
      "Pet supplies and carriers",
      "Cash in small bills (ATMs may be offline)",
    ],
    resources: [
      { label: "NHC Hurricane Preparedness", href: "https://www.nhc.noaa.gov/prepare/ready.php" },
      { label: "Ready.gov Hurricanes", href: "https://www.ready.gov/hurricanes" },
    ],
  },
  wildfire: {
    about:
      "Wildfires spread rapidly through vegetation driven by wind and dry conditions, threatening homes, air quality, and infrastructure.",
    before: [
      "Create defensible space by clearing brush and debris around your home",
      "Use fire-resistant materials where possible; clean gutters",
      "Prepare a go-bag and identify multiple evacuation routes",
    ],
    during: [
      "Follow evacuation orders immediately; don’t wait",
      "If trapped, shelter in place in a cleared area or non-combustible structure",
      "Wear an N95 or KN95 to reduce smoke inhalation if available",
    ],
    after: [
      "Return only when authorities say it’s safe; check for hot spots",
      "Discard food exposed to heat, smoke, or fire retardants",
      "Be cautious of poor air quality; ventilate and clean ash safely",
    ],
    kit: [
      "Respirators (N95/KN95), goggles, and gloves",
      "Fire-resistant blankets and clothing",
      "Go-bag with water, food, and documents",
      "Headlamp and spare batteries",
      "Map with evacuation routes marked",
    ],
    resources: [
      { label: "NFPA Wildfire Safety", href: "https://www.nfpa.org/wildfiresafety" },
      { label: "Ready.gov Wildfires", href: "https://www.ready.gov/wildfires" },
    ],
  },
  heatwave: {
    about:
      "Heatwaves are prolonged periods of excessive heat that can lead to heat exhaustion and heatstroke, especially in vulnerable populations.",
    before: [
      "Identify cool areas (libraries, community centers) and make a cooling plan",
      "Check AC or fans and weather-strip your home",
      "Stock water and light meals; plan to check on at-risk neighbors",
    ],
    during: [
      "Stay hydrated; avoid strenuous activity during peak heat",
      "Wear light, loose clothing and take cool showers",
      "Never leave children or pets in vehicles",
    ],
    after: [
      "Continue hydration; watch for heat-related illness symptoms",
      "Rest and cool down; seek medical help if symptoms persist",
      "Review your plan for future events",
    ],
    kit: [
      "Plenty of drinking water and electrolyte packets",
      "Cooling towels, fans, or portable AC",
      "Light, non-perishable foods",
      "Thermometer to monitor indoor temperature",
      "Emergency contact list",
    ],
    resources: [
      { label: "CDC Extreme Heat", href: "https://www.cdc.gov/disasters/extremeheat/index.html" },
      { label: "Ready.gov Extreme Heat", href: "https://www.ready.gov/heat" },
    ],
  },
}

function getEducation(slug: string) {
  const lower = slug.toLowerCase()
  if (EDUCATION[lower]) return EDUCATION[lower]
  return {
    about:
      "This module explains the hazard, what causes it, and how it can impact people and infrastructure, followed by practical steps to prepare, respond, and recover.",
    before: [
      "Know your local risks and alerts",
      "Create a family plan and meet-up points",
      "Assemble an emergency kit and keep documents safe",
    ],
    during: [
      "Follow official guidance and evacuations",
      "Stay informed via radio or trusted sources",
      "Avoid unnecessary travel and hazards",
    ],
    after: [
      "Check for injuries and hazards",
      "Document damage and contact insurance",
      "Seek assistance from local authorities and NGOs",
    ],
    kit: [
      "Water, food, medications (3+ days)",
      "First aid kit, flashlight, batteries",
      "Copies of IDs and important documents",
      "Cash, phone chargers, and radio",
      "Clothing, hygiene items, and blanket",
    ],
    resources: [
      { label: "Ready.gov", href: "https://www.ready.gov/" },
      { label: "IFRC (Red Cross/Red Crescent)", href: "https://www.ifrc.org/" },
    ],
  }
}

export default function ModuleDetail({ params }: { params: { slug: string } }) {
  const mod = modules.find((m) => m.id === params.slug)
  const education = getEducation(params.slug)
  if (!mod) return notFound()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{mod.title}</h1>
        <p className="text-muted-foreground leading-relaxed">{mod.description}</p>
      </header>

      <GradientBox>
        <div className="inner p-5 grid gap-5 md:grid-cols-2">
          <div>
            <img
              src={mod.image || "/placeholder.svg?height=240&width=400&query=disaster%20preparedness%20module"}
              alt={mod.imageAlt}
              className="w-full rounded-md"
            />
            <section className="mt-4">
              <h2 className="text-lg font-semibold">Quick Safety Tips</h2>
              <ul className="mt-2 list-disc pl-5 text-muted-foreground leading-relaxed">
                {mod.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Checklist</h2>
            <p className="text-sm text-muted-foreground">Tick off items as you complete them.</p>
            <div className="mt-3">
              <Checklist moduleId={mod.id} items={mod.checklist} />
            </div>
          </div>
        </div>
      </GradientBox>

      <GradientBox>
        <div className="inner p-5">
          <h2 className="text-lg font-semibold">Scenario Quiz</h2>
          <p className="text-sm text-muted-foreground">Short scenarios to test your decisions.</p>
          <div className="mt-4">
            <Link
              href={`/quizzes/${mod.id}`}
              className="inline-flex items-center rounded-md px-4 py-2 text-background"
              style={{ background: "linear-gradient(90deg, var(--color-brand-accent), var(--color-brand-primary))" }}
            >
              Take Quiz
            </Link>
          </div>
        </div>
      </GradientBox>

      <GradientBox>
        <div className="inner p-5 space-y-6">
          <section>
            <h2 className="text-lg font-semibold">About this disaster</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{getEducation(mod.id).about}</p>
          </section>

          <div className="grid gap-6 md:grid-cols-3">
            <section>
              <h3 className="font-semibold">Before</h3>
              <ul className="mt-2 list-disc pl-5 text-muted-foreground leading-relaxed">
                {getEducation(mod.id).before.map((item, i) => (
                  <li key={`before-${i}`}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="font-semibold">During</h3>
              <ul className="mt-2 list-disc pl-5 text-muted-foreground leading-relaxed">
                {getEducation(mod.id).during.map((item, i) => (
                  <li key={`during-${i}`}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="font-semibold">After</h3>
              <ul className="mt-2 list-disc pl-5 text-muted-foreground leading-relaxed">
                {getEducation(mod.id).after.map((item, i) => (
                  <li key={`after-${i}`}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <h3 className="font-semibold">Emergency Kit Essentials</h3>
            <ul className="mt-2 list-disc pl-5 text-muted-foreground leading-relaxed">
              {getEducation(mod.id).kit.map((item, i) => (
                <li key={`kit-${i}`}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-semibold">Trusted Resources</h3>
            <ul className="mt-2 space-y-2">
              {getEducation(mod.id).resources.map((r, i) => (
                <li key={`res-${i}`}>
                  <a className="underline" href={r.href} target="_blank" rel="noopener noreferrer">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </GradientBox>
    </div>
  )
}
