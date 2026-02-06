'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { FlowDiagram } from '@/components/FlowDiagram';
import { diagram1, diagram2, diagram3, diagram4 } from '@/lib/diagramConfigs';
import { Section } from '@/types';
import Image from 'next/image';

const sections: Section[] = [
  { id: 'intro', title: 'Introduction' },
  { id: 'llm', title: 'Large Language Models' },
  { id: 'hyperparameters', title: 'Hyperparameters' },
  { id: 'prompts', title: 'System and User Prompts' },
  { id: 'memory', title: 'Memory' },
  { id: 'accuracy', title: 'Accuracy, Bias, and Trust' },
  { id: 'upcoming', title: 'So, what\'s next?' },
  { id: 'reading', title: 'Further Reading' },
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const introSection = document.getElementById('intro');
      if (introSection) {
        const rect = introSection.getBoundingClientRect();
        setShowSidebar(rect.bottom < 0);
      }

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${isDark ? 'dark bg-[#25262C] text-[#E8E9EB]' : 'bg-[#F1F0EC] text-[#000000]'}`}>
      <Header isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />

      <Sidebar
        sections={sections}
        activeSection={activeSection}
        showSidebar={showSidebar}
        onSectionClick={scrollToSection}
        isDark={isDark}
      />

      <main className="py-8 sm:py-16">
        {/* Hero Section - Full Width */}
        <section id="intro" className="mb-10 sm:mb-20 relative px-4 sm:px-8 md:px-16 lg:px-32 pt-6 sm:pt-24 md:pt-32 lg:pt-40 pb-4 sm:pb-0 min-h-[60vh] flex items-center">
          {/* Mesh Background - Centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src={isDark ? "/mesh-dark.svg" : "/mesh.svg"}
              alt=""
              width={1358}
              height={473}
              className="object-contain"
              priority
            />
          </div>

          {/* Hero Content - Left aligned, vertically centered */}
          <div className="relative z-10">
            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-8 text-left">
              Designing AI Systems
            </h1>

            {/* Profile Section - Below Title */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 sm:border-4 border-current shadow-lg flex-shrink-0">
                <Image
                  src="/Profile.png"
                  alt="Anushka Gupta"
                  width={60}
                  height={60}
                  className="object-cover"
                  priority
                />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold">Anushka Gupta</h2>
            </div>
          </div>
        </section>

        {/* Blog Content Container - Left Offset */}
        <div className="px-4 sm:px-8 md:px-12 lg:ml-[28%] lg:pr-16 xl:ml-[32%] xl:pr-32">
          {/* Introduction Text */}
          <div className="space-y-4 leading-relaxed mb-20">
            <p>
              I spent most of 2025 reading and researching large language models, which people casually refer to as "AI." AI now appears to be omnipresent, and by extension, large language models. What were once simple PDF scanners are now called "AI scanners." I don't think people are to blame for this shift. The more we start to build using LLMs, the harder it becomes to pinpoint where exactly AI is being used or how much of it is actually involved.
            </p>
            <p>
              This confusion is what led me to build this project.
            </p>
            <p>
              This is my attempt at helping you understand AI and how we build around it- by breaking it down into components. Think of these components as blocks of LEGOs or, in more technical terms, elements of System Design. This offers you a new perspective on looking at AI, not as a one-stop, fix-everything solution, but a box of building blocks. Once you understand what each block does and how it works, you can imagine how different combinations will create different applications or even look at existing applications and guess how they might have been built.
            </p>
          </div>

          {/* Large Language Models */}
          <section id="llm" className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Large Language Models</h2>
            <div className="space-y-4   leading-relaxed mb-8">
              <p>
                Let's begin at the core- Large Language Models or LLMs. These LLMs are created by training transformer models on large chunks of data.
              </p>
              <p className="font-semibold">What are transformers, you might ask?</p>
              <p>
                Machines and computers do not inherently understand natural human language. While we've developed programming languages and interpreters that translate our code into machine-readable instructions, this does not mean machines understand the meaning behind what we express. For machines to interact with humans naturally, the challenge is in making machines process and execute what we say.
              </p>
              <p>
                One approach included training models on data and making them predict the next most suitable word. Kind of like how keypad suggestions work. The only problem was that, as the sentence grew longer, models lost track of what was said earlier, which made the output stop making sense gradually.
              </p>
              <p>
                This is where transformers came in. These transformers use a mechanism called "attention" that lets them see the entire sequence of words at once and hence relate between words and "understand" context more effectively. Most modern LLMs are based on this transformer architecture.
              </p>
              <p>
                So to sum it up, Large Language Models are largely transformer-based systems which are used to generate text by predicting the next best word match. We provide an input, and the models provide an output based on the patterns they have learnt while training them on vast amounts of data.
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-4 p-4 rounded-lg border border-current/20 bg-current/5">
                <p className="text-sm">
                  <strong>Note:</strong> The interactive diagrams below use free LLM models which may hit rate limits. If you encounter issues, please try a different model or try again later.
                </p>
              </div>
              <p className="  mb-4 font-semibold">Let's try:</p>
              <FlowDiagram config={diagram1} isDark={isDark} />
            </div>

            <p className="  leading-relaxed">
              Different LLMs will give you different outputs based on their training data, objectives, and processes. This means if you give the same input to multiple LLMs, you're unlikely to receive the same response. Comparing LLMs is hence pretty subjective. You'll find some models to be better at summarization and writing tasks, while others excel at reasoning or code. Choosing the right LLM for your project is therefore a design decision, not just a technical one.
            </p>
          </section>

          {/* Hyperparameters */}
          <section id="hyperparameters" className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Hyperparameters</h2>
            <div className="space-y-4   leading-relaxed mb-8">
              <p>
                Now that you've chosen your model, the next step is tuning its responses. Most LLMs expose a set of controls that let you change how they respond to the same input, without re-training the model itself. These are called hyperparameters.
              </p>
              <p>
                Remember how LLMs work internally? They produce outputs by predicting the next most suitable word. This means the output is produced word-by-word where the model uses statistics to choose each consecutive word. Hyperparameters help adjust how these words are chosen. Each LLM has it's own set of hyperparameters.
              </p>
              <p>Some common hyperparameters to fine-tune models are:</p>
              <ul className="list-none space-y-2 ml-4">
                <li><code className="code-inline">temperature</code>: controls how varied the responses are to the same input</li>
                <li><code className="code-inline">top_p</code> and <code className="code-inline">top_k</code>: different ways of selecting which words (tokens) the model can choose from. <code className="code-inline">top_k</code> limits choices to most likely tokens, which makes the responses focused, and <code className="code-inline">top_p</code> selects tokens based on cumulative probabilities, which allows more varied responses.</li>
                <li><code className="code-inline">num_predict</code> or <code className="code-inline">max_tokens</code>: sets a limit on how many tokens the model can generate</li>
                <li><code className="code-inline">stop</code>: List of words that tells the model when to halt generation</li>
                <li><code className="code-inline">repeat_penalty</code>: Discourages the model from repeating the same words or phrases excessively</li>
              </ul>
            </div>

            <div className="mb-6">
              <p className="  mb-4 font-semibold">Let's test out hyperparameters then:</p>
              <FlowDiagram config={diagram2} isDark={isDark} />
            </div>
          </section>

          {/* System and User Prompts */}
          <section id="prompts" className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">System and User Prompts</h2>
            <div className="space-y-4   leading-relaxed mb-8">
              <p>
                If hyperparameters let you statistically tune how an LLM generates text, <strong>system prompts</strong> can help you change how the model behaves while responding.
              </p>
              <p>
                There are two types of prompts: System prompts and User prompts. User prompts are what you input, while the system prompt is where you define the model's intent, behavior, and personality. You can set the system prompt in your model to "To always respond like a pirate," and it will answer every query in that style.
              </p>
              <p className="font-semibold">Try it out yourself!</p>
            </div>

            <div className="mb-6">
              <FlowDiagram config={diagram3} isDark={isDark} />
            </div>
          </section>

          {/* Memory */}
          <section id="memory" className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Memory</h2>
            <div className="space-y-4   leading-relaxed mb-8">
              <p>
                I think we're now clear with almost all basic blocks and controls, including what LLMs are, and the different ways we can tune their responses.
              </p>
              <p>
                There's just one problem, though. LLMs are fundamentally input and output models, which means once they produce an output, the interaction ends there. It does not "remember" what you asked and what it responded with.
              </p>
              <p>
                This makes building interactive, multi-turn applications difficult. The solution is simple, though, and I think you might have guessed it already. Passing the conversation history as context to the LLM. In practice, this means storing role-based message histories (user vs model) and sending them along with the system and user prompts in every request.
              </p>
            </div>

            <div className="mb-6">
              <FlowDiagram config={diagram4} isDark={isDark} />
            </div>

            <p className="  leading-relaxed font-semibold">
              And voila! What we've now gotten ourselves is the most basic version of an AI chatbot application, like ones you see nowadays: ChatGPT, Claude, Gemini, etc.
            </p>
          </section>

          {/* Accuracy, Bias, and Trust */}
          <section id="accuracy" className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Accuracy, Bias, and Trust</h2>
            <div className="space-y-4   leading-relaxed">
              <p>
                Now that we've demystified what people commonly lump together as "AI"- LLMs, hyperparameters, system and user prompts, and conversation memory, we can move onto understanding the why and how we build on top of these pieces.
              </p>
              <p>
                When we work with LLMs, one of the major concerns is understanding whether our final output(s) are factual, grounded, and ethically right. Whether the product is large-scale or small-scale, ensuring that the responses are exactly how we intend them to be is essential.
              </p>
              <p>
                At their core, LLMs are probabilistic- trained to predict the next most likely word. Verification is not involved here. Many models you use today are further trained to be helpful and fluent, which is sometimes at the cost of caution- especially in situations where uncertainty or even refusal might be more appropriate.
              </p>
              <div className="my-8 flex justify-center">
                <Image
                  src={isDark ? "/P1D1_Dark.drawio.png" : "/P1D1.drawio.png"}
                  alt="Diagram illustrating LLM false confidence"
                  width={0}
                  height={0}
                  sizes="100vw"
                  quality={100}
                  className="w-full h-auto px-4 sm:px-12 md:px-24"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p>Therefore, there are limitations that come with building with LLMs that we must keep in mind:</p>

              <p>
                <strong>1.</strong> Models might produce false statements over admitting uncertainty. Why don't you test it out? Try making up a word and asking a chatbot, "What does {'{'}insert word here{'}'} slang mean?" The answer would not only sound confident, but it would also be followed by a "plausible" explanation.
              </p>

              <p>
                <strong>2.</strong> LLMs are trained on large amounts of publicly available data. <strong>This means LLMs are neither "all knowing" nor have access to sensitive or private information</strong>. If you ask something like "What's my colleague's salary?" The answer you'll receive will be either fabricated or a guess.
              </p>

              <p>
                <strong>3.</strong> LLMs are not always up-to date. Since training is an expensive process and is typically done once or twice a year, <strong>their knowledge lags behind real-world events</strong>. For example, asking the model to list all places that experienced an earthquake today will likely result in an incomplete or incorrect answer.
              </p>

              <p>
                <strong>4.</strong> <strong>LLMs can reflect biases present in their training data</strong>. These biases may surface in unexpected and subtle ways, which pose ethical risks if unexamined. Addressing these biases is part of our responsibilities while building such systems.
              </p>

              <div className="my-8 flex justify-center">
                <Image
                  src={isDark ? "/P1D2_Dark.drawio.png" : "/P1D2.drawio.png"}
                  alt="Diagram illustrating LLM biases"
                  width={0}
                  height={0}
                  sizes="100vw"
                  quality={100}
                  className="w-full h-auto"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <p>
                <strong>5.</strong> Humans have the ability to learn something and retain that information for a long time. LLMs, however, cannot. While we can easily switch between topics, remember relevant context, and carry the conversation forward, LLMs struggle as the exchanges grow longer. You might have experienced it yourself: when asking a chatbot about the same task repeatedly, the responses might become worse and worse until the answers are generated completely out of context. What happens here internally is that <strong>earlier information is compressed, ignored, or dropped because the model can only process a certain amount of information at a time</strong>. This amount of information is known as a "context window". When the LLMs start to generate text that is inaccurate and nonsensical, it's called hallucination. Bringing down hallucinations to a minimum is critical to any application.
              </p>

              <div className="my-8 flex justify-center">
                <Image
                  src={isDark ? "/P1D3_Dark.drawio.png" : "/P1D3.drawio.png"}
                  alt="Diagram illustrating LLM context window limitations"
                  width={0}
                  height={0}
                  sizes="100vw"
                  quality={100}
                  className="w-full h-auto px-4 sm:px-12 md:px-24 lg:px-48"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </section>
          {/* Next Steps */}
          <section id="upcoming" className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">So, what's next?</h2>
            <div className="space-y-4   leading-relaxed mb-8">
              <p>
                Understanding the limitations of LLMs is the first step to working with them as a <strong>tool</strong> and to building around them. This also opens up a new set of “blocks” and combinations that people use for most modern AI applications: Retrieval Augmented Generation (RAG), Search-based Augmentation, Agents, and MCPs.
              </p>
              <p>
                I’m looking forward to delving into them next. Maybe along the way, you’ll find combinations that work best for you or even get to design one of the blocks.
              </p>
            </div>
          </section>

          {/* Further Reading */}
          <section id="reading" className="mb-20">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">Further Reading</h3>
            <ul className="list-none space-y-2 ml-4">
              <li>
                <a href="https://jalammar.github.io/illustrated-transformer/" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-[#AE666A]' : 'text-[#4157A1]'} hover:underline`}>
                  The Illustrated Transformer
                </a>
              </li>
              <li>
                <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-[#AE666A]' : 'text-[#4157A1]'} hover:underline`}>
                  Attention Is All You Need (Research Paper)
                </a>
              </li>
              <li>
                <a href="https://www.datacamp.com/tutorial/llm-benchmarks" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-[#AE666A]' : 'text-[#4157A1]'} hover:underline`}>
                  Choosing Between LLMs: Benchmarks & Comparisons
                </a>
              </li>
              <li>
                <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-[#AE666A]' : 'text-[#4157A1]'} hover:underline`}>
                  Prompt Engineering Best Practices (Anthropic)
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=T9aRN5JkmL8" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-[#AE666A]' : 'text-[#4157A1]'} hover:underline`}>
                  Prompt Engineering Explained (Video)
                </a>
              </li>
              <li>
                <a href="https://www.kaggle.com/whitepaper-foundational-llm-and-text-generation" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-[#AE666A]' : 'text-[#4157A1]'} hover:underline`}>
                  Foundations of LLMs & Text Generation (Google's Whitepaper)
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}