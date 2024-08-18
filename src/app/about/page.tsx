import { Blockquote } from "@/components/ui/typography/blockquote"
import { H1 } from "@/components/ui/typography/h1"
import { P } from "@/components/ui/typography/p"
import { Li, Ul } from "@/components/ui/typography/un-ordered-list"

export default function About() {
  return (
    <div>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 grid-flow-col">
          <div className="w-80 float-left">
            <div className="relative w-80 h-80 overflow-hidden rounded-full">
              <img
                src="/images/portrait_jb_bw.jpg"
                alt="Julius á Rógvi Biskopstø"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex items-start">
            <article className="space-y-6">
              <H1>Welcome to The Caffeinated Codebase</H1>

              <P>A personal tech blog by Julius Á Rógvi Biskopstø, Co-Founder and CTO of Flowcore.</P>

              <P>
                This blog is my digital playground where I share unfiltered thoughts, experiences, and insights gained
                from my journey through the ever-evolving world of software engineering and cloud architecture. Here,
                you'll find:
              </P>

              <Ul>
                <Li>Deep dives into software architecture and design concepts</Li>
                <Li>Behind-the-scenes looks at ongoing projects and tasks</Li>
                <Li>
                  Explorations of new technologies and methodologies, including Flowcore Intent Driven Development
                </Li>
                <Li>Reflections on the challenges and triumphs of being a CTO in today's tech landscape</Li>
                <Li>Practical insights into cloud-native solutions, Kubernetes, and GitOps</Li>
              </Ul>

              <P>
                The Caffeinated Codebase isn't about presenting polished, final products. Instead, it's an invitation to
                join me on a journey of continuous learning and experimentation. From the creation of this very blog to
                the latest project at Flowcore, I'll be sharing my thought processes, decisions, and the occasional
                "aha!" moment.
              </P>

              <P>
                Whether you're a seasoned developer, a curious beginner, or somewhere in between, I hope you'll find
                something here to pique your interest or spark a conversation. This blog is updated as inspiration
                strikes - no strict schedules, just genuine passion for technology and software craftsmanship.
              </P>

              <P>
                So grab your favorite caffeinated beverage, pull up a chair, and let's explore the fascinating world of
                software engineering together. Who knows? We might just stumble upon the next big idea or solve a tricky
                problem along the way.
              </P>

              <P>
                Welcome to The Caffeinated Codebase - where ideas percolate, code evolves, and learning never stops.
              </P>

              <Blockquote>
                P.S. Full disclosure: I'll be using AI to help polish these posts. Think of it as my digital personal
                assistant - making the writing process smoother for me and hopefully more enjoyable for you. Don't
                worry, the ideas are all mine; the AI just helps me sound slightly more coherent after juggling CTO
                duties, co-founder responsibilities, wrangling two energetic kids, and tackling the never-ending chores
                of a new homeowner. Now, if only the EU would approve our proposal to extend the day by a few hours...
              </Blockquote>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
