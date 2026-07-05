import clsx from "clsx";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { ReactElement } from "react";

interface Feature {
  title: string;
  imageUrl: string;
  description: ReactElement;
}

const features: Feature[] = [
  {
    title: "Easy to Use",
    imageUrl: '/img/icons/computer.png',
    description: (
      <>
        Sandstone was designed to be easily installed, and used
        to create your first datapacks quickly.
      </>
    ),
  },
  {
    title: "Focus on What Matters",
    imageUrl: '/img/icons/dirt.png',
    description: (
      <>
        Sandstone lets you focus on your logic, and takes care of the implementation.
        The familiar abstractions help you keep your head clear of all distractions.
      </>
    ),
  },
  {
    title: "Powered by Typescript",
    imageUrl: '/img/icons/ts.png',
    description: (
      <>
        Typescript provides perfect autocompletion, prevents your errors
        before you even hit "run", and ensure your code is maintainable.
      </>
    ),
  },
];

// Feature Card
function Feature({ imageUrl, title, description }: Feature) {
  return (
    <div className = {clsx(styles.panel, styles.feature)}>
      {/* Feature Icon */}
      <div className = { styles.featureIconContainer }>
        <img className = { styles.featureIcon } src = { imageUrl } alt = { title } />
      </div>

      {/* Text */}
      <h3 className = { styles.featureTitle }>{ title }</h3>
      <p className = { styles.featureDescription }>{ description }</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} as any } = context;
  return (
    <Layout
      title={`${siteConfig.title} | A Typescript library for Minecraft Datapacks & Resource Packs`}
      description="Sandstone is a Typescript library used to create Minecraft datapacks & resource packs. Featuring perfect autocompletion, while &amp; for loops, shared configurable libraries..."
    >
      <div className = { styles.page }>
        <header className = { styles.heroBanner }>
          
          {/* Hero content grid */}
          <div className = { styles.heroGrid }>

            {/* Left Content */}
            <div className = { styles.heroText }>
              <span className = { styles.badge }>Typescript &rarr; Datapack</span>
            
              <h1 className = { styles.heroTitle }>{ siteConfig.title }</h1>
              <p className = { styles.heroSubtitle }>{ siteConfig.tagline }</p>

              <div className = { styles.buttonGroup }>
                <Link
                  className = { clsx(styles.button, styles.buttonPrimary) }
                  to = { useBaseUrl("docs/") }
                >
                  Get Started
                </Link>

                <Link
                  className = { clsx(styles.button, styles.buttonSecondary) }
                  href = "https://github.com/sandstone-mc/sandstone"
                >
                  Github
                </Link>
              </div>

              {/* install command */}
              <div className={styles.installBox}>
                <span className={styles.installPrompt}>$</span>
                <span className={styles.installCommand}>bun i -g sandstone-cli</span>
              </div>

            </div>
          </div>
        </header>
      </div>
    </Layout>
  );
}

export default Home;
