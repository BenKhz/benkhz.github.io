const e=`# Restoring a 1980 Williams Blackout: A Weekend That Became a Month

I picked up a Williams Blackout a while back. It was in rough shape — cabinet paint peeling, displays dark, playfield worn down to bare wood in spots. The kind of machine that's cheap to buy and expensive to fix properly. Which, of course, is exactly why I bought it.

Blackout holds a weird little spot in pinball history. Released in 1980, it was the [first pinball machine with computer-controlled general illumination](https://en.wikipedia.org/wiki/Blackout_(pinball)). When you hit the right targets, a relay in the backbox — called the G Relay — cuts power to every light on the playfield at once. Everything goes dark. It's theatrical, it's dramatic, and it's the whole reason the machine is called Blackout. For a box running on a Williams [System 6](https://www.pinwiki.com/wiki/index.php?title=Williams_System_3_-_7) MPU with a 6808 CPU, that's a surprisingly clever trick.

The restore was a big one. Full shopping, new electronics, cabinet repaint — the works. Here's how it went, and what I learned along the way.

## Step One: Strip It Down

"Shopping" a pinball machine is the industry term for a full disassembly and rebuild. For Blackout, that meant pulling everything off the playfield: the three pop bumpers, both three-bank drop target assemblies, all six standup targets, the three spinners, the kick-out hole, the slingshots, and every switch in the place. Everything comes off, gets cleaned, inspected, and goes back on.

It sounds like a lot. It is a lot. But the process is methodical. You [take photos before you touch anything](https://homepinballrepair.com/shop-your-pinball-machine-part-3-clearing-the-playfield/), label everything, and work in order. The manual helps, though System 6 manuals are thinner on detail than later generations. The real secret is patience and a good parts organizer. I used an egg carton for screws and a tackle box for everything else.

The reason you do this isn't just cosmetic. When a machine is 40-plus years old, every switch contact is dirty, every coil has seen thousands of firings, and there are four decades of dust and gunk in places you can't reach without taking it apart. You're not just cleaning — you're resetting the whole machine back to something close to factory.

## The Electronics: Displays and Driver Boards

The original Blackout uses high-voltage gas plasma displays — the kind that need around 200V to light up. They were state of the art in 1980. In 2024, they're a maintenance nightmare. The displays themselves are basically unobtainable, and the high-voltage circuitry they depend on is one more thing that can fail quietly and take everything else down with it.

I swapped the whole display set for an LED kit — a drop-in replacement designed for [Williams System 3 through 6 machines](https://homepinballrepair.com/installing-led-displays-in-pinball-machines/). The LEDs replicate the classic orange glow of the originals, they use the existing cables, and once they're installed you can pull the high-voltage fuse from the power supply entirely. One less thing to worry about. One less thing that can take the whole machine offline.

The driver boards got replaced too. The System 6 driver board sits underneath the MPU and handles solenoid switching — every bumper, every flipper, every drop target reset. On a board that's been running for 44 years, capacitors drift, solder joints crack, and transistors go flaky in ways that are genuinely hard to diagnose. New boards meant starting from a known-good baseline instead of chasing intermittent failures one at a time.

## The Playfield

Here's where it gets practical. The original Blackout playfield was worn badly — decades of ball travel will do that to any machine. Repainting a playfield from scratch is an art form; the graphics on these old games are hand-screened and incredibly detailed. Doing it right takes serious skill and a lot of time.

I went with a playfield mat from [Pinball Pimp](https://www.pinballpimp.com/) instead. A mat lays down over the existing playfield surface and gives you a fresh, clean playing surface without having to restore the wood underneath. It's one of the better shortcuts in the restoration world — you get a playfield that looks and plays like new without weeks of touch-up painting. For a machine where the original artwork is already gone in spots, it's the right call.

## The Cabinet

The cabinet was in rough shape. Paint chips, scuffs, the occasional gouge from being moved in and out of bars and basements over the years. I sanded it down, filled the damage, and repainted it from scratch.

One thing worth knowing before you start: machines from around 1980 may have lead paint on the original cabinet. I did the sanding outside, with a respirator, and cleaned up properly afterward. Not glamorous advice, but the kind of thing you don't want to learn the hard way.

The process itself is straightforward once you've done the prep. Sand flat, fill gouges, sand again, then prime — I used a sealing primer so wood grain and old staples don't bleed through the topcoat. Two coats of gloss enamel and it looked like it rolled off the factory floor. Getting the color right matters though. Blackout's cabinet has a specific look, and a shade that's even slightly off will bug you every single time you walk past it.

## Putting It Back Together

Reassembly is where all those photos from the disassembly pay off. Everything goes back in reverse order: switches first, then coils, then the bigger assemblies. You adjust, you test, you adjust again. Pop bumper switches need to be clean and properly tensioned or they won't fire reliably. Drop targets need to be level with the playfield or they'll create wear spots right where you just fixed things.

The first time you power it on and everything works — lights, sound, displays, solenoids firing correctly — there's a specific feeling. It's not quite pride. It's more like relief that 40-plus years of entropy didn't completely win.

## Was It Worth It?

Yeah. A Blackout is one of the best single-ball games ever made — fast, punishing, and that blackout effect still gets people every time. Rated in the [top 200 on Pinside](https://pinside.com/pinball/machine/blackout), it punches well above its weight for a machine with no multiball.

It's not a quick project. It's not a cheap project. But if you've got a machine you care about and the patience to do it right, there's nothing quite like pulling a 44-year-old piece of hardware back from the edge and watching it play like new.

## Further Reading

- [IPDB — Williams Blackout](https://www.ipdb.org/machine.cgi?id=317) — The definitive pinball database entry; specs, history, and production numbers
- [PinWiki — Williams System 3-7](https://www.pinwiki.com/wiki/index.php?title=Williams_System_3_-_7) — Board layouts, repair guides, and troubleshooting for the System 6 platform
- [Pinball Pimp](https://www.pinballpimp.com/) — Restoration services and playfield work out of Tampa, FL
- [HomePinballRepair — Shopping Your Machine](https://homepinballrepair.com/shop-your-pinball-machine-part-3-clearing-the-playfield/) — A solid walkthrough of the full disassembly and shopping process
`;export{e as default};
