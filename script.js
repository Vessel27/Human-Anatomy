      // ─────────────────────────────────────────────
      // STATE (declared first so all code can access)
      // ─────────────────────────────────────────────
      let activeSystem = null;
      let activeGender = "female";
      let selectedOrganIndex = null;

      // ─────────────────────────────────────────────
      // DATA
      // ─────────────────────────────────────────────
      const SYSTEMS = {
        integumentary: {
          name: "Integumentary",
          color: "#f59e0b",
          icon: "🧬",
          tagline: "The body's protective outer barrier",
          sketchfabEmbed:
            "https://sketchfab.com/models/927ec094c29644ef8bff1538b4744579/embed?autostart=1&ui_theme=dark",
          description:
            "The largest organ system covering the entire body surface, providing protection, sensation, and thermoregulation.",
          organs: [
            {
              name: "Epidermis",
              icon: "🌊",
              fn: "Outermost skin layer",
              desc: "The epidermis is the thin outer layer of skin composed of stratified squamous epithelium. It contains melanocytes, keratinocytes, Langerhans cells, and Merkel cells. It renews itself every 14–28 days through continuous cell division.",
            },
            {
              name: "Dermis",
              icon: "🔗",
              fn: "Connective tissue layer",
              desc: "The dermis lies beneath the epidermis and contains tough connective tissue, hair follicles, and sweat glands. It provides structure, strength, and elasticity to skin through collagen and elastin fibers.",
            },
            {
              name: "Hair Follicles",
              icon: "〰️",
              fn: "Hair production units",
              desc: "Tubular structures in the dermis and hypodermis that produce hair. Each follicle goes through cyclic phases of growth (anagen), regression (catagen), and rest (telogen).",
            },
            {
              name: "Sweat Glands",
              icon: "💧",
              fn: "Thermoregulation & excretion",
              desc: "Two types: eccrine glands distributed over the entire body for cooling, and apocrine glands in armpits and groin producing a thicker secretion involved in scent.",
            },
            {
              name: "Sebaceous Glands",
              icon: "🫧",
              fn: "Oil secretion",
              desc: "Oil-producing glands attached to hair follicles. They secrete sebum which lubricates skin and hair, and provides antimicrobial protection.",
            },
            {
              name: "Nails",
              icon: "🔷",
              fn: "Protection of fingertips",
              desc: "Hard keratinous plates covering the dorsal surface of fingertips and toes. They protect the tips of digits and aid in grasping small objects.",
            },
          ],
          stats: [
            { val: "2 m²", lbl: "Surface area" },
            { val: "4 kg", lbl: "Average weight" },
            { val: "~28d", lbl: "Renewal cycle" },
            { val: "3 layers", lbl: "Main layers" },
          ],
          fact: "<strong>Remarkable fact:</strong> The skin sheds about 30,000–40,000 dead cells every hour — you lose and replace your outer skin layer every 2–4 weeks.",
          overlayParts: ["skin"],
        },
        skeletal: {
          name: "Skeletal",
          color: "#94a3b8",
          icon: "🦴",
          tagline: "The structural framework of the body",
          sketchfabEmbed:
            `<div class="sketchfab-embed-wrapper"> <iframe title="Skeleton - Names of Human Skeleton" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/0c66fa3be6584d72a455accab123f1bd/embed"> </iframe> <p style="font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;"> <a href="https://sketchfab.com/3d-models/skeleton-names-of-human-skeleton-0c66fa3be6584d72a455accab123f1bd?utm_medium=embed&utm_campaign=share-popup&utm_content=0c66fa3be6584d72a455accab123f1bd" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;"> Skeleton - Names of Human Skeleton </a> by <a href="https://sketchfab.com/srikanthsamba?utm_medium=embed&utm_campaign=share-popup&utm_content=0c66fa3be6584d72a455accab123f1bd" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;"> srikanthsamba </a> on <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=0c66fa3be6584d72a455accab123f1bd" target="_blank" rel="nofollow" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a></p></div>`,
          description:
            "The skeletal system forms the rigid framework that supports and protects the body's organs, enables movement, produces blood cells, and stores minerals.",
          organs: [
            {
              name: "Skull",
              icon: "💀",
              fn: "Brain protection",
              desc: "The skull is a bony structure that forms the head. It protects the brain, eyes, and ears, and supports facial structures. It consists of 22 bones (8 cranial, 14 facial).",
            },
            {
              name: "Vertebral Column",
              icon: "🔩",
              fn: "33 vertebrae, supports posture",
              desc: "The spine consists of 33 vertebrae: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral (fused), and 4 coccygeal (fused). It protects the spinal cord and allows body movement.",
            },
            {
              name: "Ribcage",
              icon: "🏹",
              fn: "Protects heart and lungs",
              desc: "12 pairs of ribs forming a cage-like structure. True ribs (1–7) attach directly to sternum; false ribs (8–10) attach via cartilage; floating ribs (11–12) have no anterior attachment.",
            },
            {
              name: "Pelvis",
              icon: "⊙",
              fn: "Hip support & organ protection",
              desc: "The pelvis is formed by the two hip bones (ilium, ischium, pubis), the sacrum, and coccyx. It supports the spinal column and bears weight during sitting and walking.",
            },
            {
              name: "Long Bones",
              icon: "📏",
              fn: "Limb structure & movement",
              desc: "Bones like the femur, tibia, humerus, and radius that are longer than they are wide. They act as levers for muscle action and contain marrow for blood cell production.",
            },
            {
              name: "Joints",
              icon: "🔗",
              fn: "Connection & articulation",
              desc: "Points where two or more bones meet. Types include fibrous (skull sutures), cartilaginous (intervertebral discs), and synovial (ball-and-socket, hinge) joints.",
            },
          ],
          stats: [
            { val: "206", lbl: "Adult bones" },
            { val: "300+", lbl: "Bones at birth" },
            { val: "360", lbl: "Joints" },
            { val: "70%", lbl: "Bone is mineral" },
          ],
          fact: "<strong>Remarkable fact:</strong> The femur (thigh bone) is the strongest bone in the body — it can withstand a force of up to 1,700 pounds.",
          overlayParts: ["skull", "spine", "ribs", "pelvis", "limbs"],
        },
        lymphatic: {
          name: "Lymphatic",
          color: "#10b981",
          icon: "🫘",
          tagline: "Defense and fluid balance network",
          sketchfabEmbed:
            "https://sketchfab.com/models/14800d739ecb46678d7584a401b0aa77/embed?autostart=1&ui_theme=dark",
          description:
            "The lymphatic system is a network of vessels, nodes, and organs that maintains fluid balance, supports immune function, and absorbs dietary fats.",
          organs: [
            {
              name: "Lymph Nodes",
              icon: "⚪",
              fn: "Immune filtration stations",
              desc: "Small bean-shaped structures that filter lymph fluid. They contain lymphocytes and macrophages that identify and destroy pathogens. There are approximately 600 lymph nodes throughout the body.",
            },
            {
              name: "Spleen",
              icon: "🫘",
              fn: "Blood filtering & immune response",
              desc: "The largest lymphatic organ, located in the upper left abdomen. It filters blood, recycles iron from old red blood cells, and stores platelets and white blood cells.",
            },
            {
              name: "Thymus",
              icon: "🦋",
              fn: "T-cell maturation",
              desc: "A bilobed organ in the chest behind the sternum. Crucial for immune development, especially in childhood. T lymphocytes mature here before circulating to fight infections.",
            },
            {
              name: "Tonsils",
              icon: "🔴",
              fn: "First line of defense in throat",
              desc: "Lymphoid tissue masses at the back of the throat (palatine tonsils), tongue (lingual), and nasal cavity (adenoids). They trap and help eliminate pathogens entering through the mouth and nose.",
            },
            {
              name: "Lymph Vessels",
              icon: "〰️",
              fn: "Lymph transport network",
              desc: "A network of thin-walled vessels that collect interstitial fluid from tissues and return it to the bloodstream. They have one-way valves to prevent backflow.",
            },
            {
              name: "Bone Marrow",
              icon: "🔵",
              fn: "Lymphocyte production",
              desc: "The soft tissue inside bones where B lymphocytes originate. Red bone marrow produces all blood cells including immune cells through a process called hematopoiesis.",
            },
          ],
          stats: [
            { val: "~600", lbl: "Lymph nodes" },
            { val: "2L", lbl: "Lymph/day" },
            { val: "90%", lbl: "Fluid returned" },
            { val: "3 types", lbl: "Lymphocytes" },
          ],
          fact: "<strong>Remarkable fact:</strong> The lymphatic system collects about 20 liters of plasma daily from body tissues and returns 17 liters back to the blood — the remaining 3L is filtered by lymph nodes.",
          overlayParts: ["lymph"],
        },
        reproductive: {
          name: "Reproductive",
          color: "#ec4899",
          icon: "🧬",
          tagline: "Biological system for creating life",
          sketchfabEmbed: {
            female:
              "https://sketchfab.com/models/445e5d3977d848419253a4058137555f/embed?autostart=1&ui_theme=dark",
            male: "https://sketchfab.com/models/0c8ff9f922c042d9b7d5c6d8d11f0f77/embed?autostart=1&ui_theme=dark",
          },
          description:
            "The reproductive system enables the production of offspring. It differs significantly between males and females in structure and function.",
          gender: true,
          male: [
            {
              name: "Testes",
              icon: "⚫",
              fn: "Sperm & testosterone production",
              desc: "The primary male gonads housed in the scrotum. They produce sperm (spermatogenesis) and testosterone. Temperature-sensitive — kept 2–3°C below body temperature for optimal sperm production.",
            },
            {
              name: "Epididymis",
              icon: "〰️",
              fn: "Sperm maturation & storage",
              desc: "A coiled tube behind each testis where sperm mature and are stored. Sperm spend 2–3 weeks here, gaining motility and the ability to fertilize an egg.",
            },
            {
              name: "Vas Deferens",
              icon: "➡️",
              fn: "Sperm transport duct",
              desc: "A muscular tube that transports sperm from the epididymis to the ejaculatory duct. It contracts rhythmically during ejaculation to propel sperm.",
            },
            {
              name: "Prostate Gland",
              icon: "🔵",
              fn: "Seminal fluid production",
              desc: "A walnut-sized gland that secretes a milky fluid forming part of semen. Prostatic fluid protects and nourishes sperm and helps them reach the egg.",
            },
            {
              name: "Seminal Vesicles",
              icon: "🟢",
              fn: "Fructose-rich fluid provider",
              desc: "Paired glands that produce about 70% of the fluid in semen. The fluid is rich in fructose which provides energy for sperm motility.",
            },
            {
              name: "Penis",
              icon: "🔹",
              fn: "Sperm delivery & urination",
              desc: "The external male organ that serves dual functions: delivering sperm during intercourse (via ejaculation) and expelling urine. Contains erectile tissue (corpora cavernosa, corpus spongiosum).",
            },
          ],
          female: [
            {
              name: "Ovaries",
              icon: "⚪",
              fn: "Egg & hormone production",
              desc: "Paired almond-shaped organs that produce oocytes (eggs) and hormones (estrogen, progesterone). A woman is born with ~1–2 million follicles, of which ~400 will mature and be released.",
            },
            {
              name: "Fallopian Tubes",
              icon: "〰️",
              fn: "Egg transport to uterus",
              desc: "Two tubes that connect the ovaries to the uterus. Fertilization typically occurs in the ampulla (widest section). Cilia and smooth muscle contractions move the egg/embryo toward the uterus.",
            },
            {
              name: "Uterus",
              icon: "🔺",
              fn: "Fetal development site",
              desc: "A hollow, pear-shaped muscular organ where the fertilized egg implants and the fetus develops. The endometrium (inner lining) thickens each cycle; if no implantation, it sheds (menstruation).",
            },
            {
              name: "Cervix",
              icon: "⭕",
              fn: "Uterine entrance",
              desc: "The lower, narrow end of the uterus that extends into the vagina. It produces mucus that changes consistency through the menstrual cycle. During labor, it dilates to allow delivery.",
            },
            {
              name: "Vagina",
              icon: "🔶",
              fn: "Birth canal & intercourse organ",
              desc: "A muscular tube connecting the cervix to the vulva. It serves as the birth canal during delivery, receives the penis during intercourse, and channels menstrual flow out of the body.",
            },
            {
              name: "Mammary Glands",
              icon: "🔵",
              fn: "Milk production",
              desc: "Modified sweat glands in the breasts that produce milk (lactation) after childbirth. Stimulated by prolactin and oxytocin hormones. Also have hormonal functions related to the cycle.",
            },
          ],
          stats: [
            { val: "400", lbl: "Ovulations (lifetime)" },
            { val: "280M", lbl: "Sperm per ejaculate" },
            { val: "9mo", lbl: "Gestation period" },
            { val: "28d", lbl: "Avg. cycle length" },
          ],
          fact: "<strong>Remarkable fact:</strong> A human egg is the largest cell in the human body at ~0.1 mm, while sperm are among the smallest cells — yet together they create a complete new organism.",
          overlayParts: ["pelvis_organs"],
        },
        muscular: {
          name: "Muscular",
          color: "#ef4444",
          icon: "💪",
          tagline: "The engine of movement and posture",
          sketchfabEmbed:
            "https://sketchfab.com/models/7ea21567ff9942bf9511e2d99efe85d9/embed?autostart=1&ui_theme=dark",
          description:
            "Over 600 muscles enable movement, maintain posture, generate heat, and move substances through the body via involuntary contractions.",
          organs: [
            {
              name: "Cardiac Muscle",
              icon: "❤️",
              fn: "Involuntary heart pumping",
              desc: "Found only in the heart, cardiac muscle is striated and contracts involuntarily. It has unique intercalated discs allowing electrical signals to pass rapidly between cells, enabling the heart to beat as one.",
            },
            {
              name: "Smooth Muscle",
              icon: "〰️",
              fn: "Involuntary organ movements",
              desc: "Non-striated involuntary muscle found in walls of hollow organs (stomach, intestines, blood vessels, bladder). Controls movements you don't consciously think about.",
            },
            {
              name: "Skeletal Muscle",
              icon: "💪",
              fn: "Voluntary body movement",
              desc: "Striated muscle attached to bones via tendons. Controlled consciously. Makes up about 40% of body weight. Examples: biceps, quadriceps, deltoids.",
            },
            {
              name: "Tendons",
              icon: "🔗",
              fn: "Muscle-to-bone connectors",
              desc: "Dense fibrous connective tissue that attaches muscles to bones. They transmit the force generated by muscle contraction to create movement at joints.",
            },
            {
              name: "Diaphragm",
              icon: "⌒",
              fn: "Primary breathing muscle",
              desc: "A dome-shaped muscle at the base of the chest that is the primary muscle of breathing. When it contracts, it flattens, increasing lung volume and drawing in air.",
            },
            {
              name: "Facial Muscles",
              icon: "😊",
              fn: "Expression & chewing",
              desc: "Over 40 muscles control facial expressions. The masseter (jaw muscle) is the strongest muscle per unit area, producing forces up to 200 lbs on molars.",
            },
          ],
          stats: [
            { val: "600+", lbl: "Muscles total" },
            { val: "40%", lbl: "Body weight" },
            { val: "37°C", lbl: "Heat generated" },
            { val: "100×", lbl: "Force range" },
          ],
          fact: "<strong>Remarkable fact:</strong> The gluteus maximus is the largest muscle; the stapedius in the ear is the smallest; but the tongue is the only muscle attached at only one end.",
          overlayParts: ["muscles"],
        },
        urinary: {
          name: "Urinary",
          color: "#f97316",
          icon: "🫘",
          tagline: "Waste filtration and fluid regulation",
          sketchfabEmbed:
            "https://sketchfab.com/models/4c9f8c0b084e4b8192936495563f92a7/embed?autostart=1&ui_theme=dark",
          description:
            "The urinary system filters blood, removes waste products, regulates water and electrolyte balance, and maintains blood pH through urine production.",
          organs: [
            {
              name: "Kidneys",
              icon: "🫘",
              fn: "Blood filtration (2 organs)",
              desc: "Two bean-shaped organs located in the posterior abdomen. Each contains ~1 million nephrons that filter ~120–180 liters of blood per day, producing 1–2 liters of urine. They also regulate blood pressure via the renin-angiotensin system.",
            },
            {
              name: "Ureters",
              icon: "➡️",
              fn: "Kidney-to-bladder transport",
              desc: "Two muscular tubes (~25–30 cm) that carry urine from each kidney to the bladder. Peristaltic contractions propel urine downward every 10–15 seconds.",
            },
            {
              name: "Urinary Bladder",
              icon: "🎈",
              fn: "Urine storage",
              desc: "A muscular hollow organ that stores urine (typically 300–500 mL capacity). The detrusor muscle stretches to accommodate urine and contracts during urination. The internal and external urethral sphincters control release.",
            },
            {
              name: "Urethra",
              icon: "〰️",
              fn: "Urine expulsion tube",
              desc: "The tube through which urine exits the body. In females it is ~4 cm; in males ~20 cm (also serving as the semen duct). Controlled by the external urethral sphincter (voluntary).",
            },
            {
              name: "Nephrons",
              icon: "⬡",
              fn: "Functional filtration units",
              desc: "The microscopic functional units of the kidney. Each nephron consists of a glomerulus (filtration), Bowman's capsule, proximal tubule, loop of Henle, distal tubule, and collecting duct.",
            },
            {
              name: "Adrenal Glands",
              icon: "🔺",
              fn: "Hormone regulation",
              desc: "Situated atop each kidney, adrenal glands produce aldosterone (regulates sodium/water retention), cortisol, adrenaline, and sex hormones. They play a key role in blood pressure and stress response.",
            },
          ],
          stats: [
            { val: "180L", lbl: "Blood filtered/day" },
            { val: "1-2L", lbl: "Urine produced/day" },
            { val: "2M", lbl: "Total nephrons" },
            { val: "25min", lbl: "Full filtration cycle" },
          ],
          fact: "<strong>Remarkable fact:</strong> Your kidneys filter your entire blood volume about 60 times per day — approximately once every 24 minutes — making them extraordinarily efficient organs.",
          overlayParts: ["kidneys", "bladder"],
        },
        digestive: {
          name: "Digestive",
          color: "#84cc16",
          icon: "🫁",
          tagline: "Nutrient extraction and processing",
          sketchfabEmbed:
            "https://sketchfab.com/models/584766fd58684369b166611faec98e04/embed?autostart=1&ui_theme=dark",
          description:
            "The digestive system breaks down food mechanically and chemically into nutrients that can be absorbed into the bloodstream to fuel the body.",
          organs: [
            {
              name: "Mouth & Esophagus",
              icon: "👄",
              fn: "Ingestion & swallowing",
              desc: "Digestion begins in the mouth with teeth breaking food and saliva (amylase) beginning starch digestion. The esophagus carries food to the stomach via peristalsis, taking ~8 seconds.",
            },
            {
              name: "Stomach",
              icon: "🔵",
              fn: "Acid digestion & churning",
              desc: "A J-shaped muscular organ that holds food for 2–6 hours. Gastric acid (HCl, pH 1.5–3.5) and enzymes (pepsin) break down proteins. Mechanical churning creates chyme.",
            },
            {
              name: "Small Intestine",
              icon: "〰️",
              fn: "Nutrient absorption (6-7m)",
              desc: "The ~6–7 meter tube where most digestion and absorption occur. Villi and microvilli increase surface area to ~250 m². Bile, pancreatic enzymes, and intestinal enzymes complete digestion.",
            },
            {
              name: "Large Intestine",
              icon: "⭕",
              fn: "Water absorption & waste",
              desc: "1.5 meter tube that absorbs water and electrolytes from remaining indigestible food. Houses ~100 trillion gut bacteria (microbiome) that ferment fiber and produce vitamins K and B12.",
            },
            {
              name: "Liver",
              icon: "🟤",
              fn: "Over 500 metabolic functions",
              desc: "The largest internal organ (~1.5 kg), performing over 500 functions: produces bile, metabolizes carbohydrates/proteins/fats, detoxifies blood, makes clotting factors, stores glycogen and vitamins.",
            },
            {
              name: "Pancreas",
              icon: "🩶",
              fn: "Enzymes & blood sugar control",
              desc: "Dual-function: exocrine (secretes digestive enzymes into small intestine) and endocrine (produces insulin, glucagon via islets of Langerhans to regulate blood sugar).",
            },
          ],
          stats: [
            { val: "9m", lbl: "Total GI tract length" },
            { val: "250m²", lbl: "Absorption surface" },
            { val: "100T", lbl: "Gut bacteria" },
            { val: "24-72h", lbl: "Transit time" },
          ],
          fact: "<strong>Remarkable fact:</strong> The small intestine's inner surface, if unfolded, would cover a tennis court (250 m²) — maximizing the surface available for nutrient absorption.",
          overlayParts: ["stomach", "intestines", "liver"],
        },
        excretory: {
          name: "Excretory",
          color: "#a78bfa",
          icon: "♻️",
          tagline: "Waste removal and body purification",
          sketchfabEmbed:
            "https://sketchfab.com/models/ab00c534954d435eb6a3c6c36173b9f7/embed?autostart=1&ui_theme=dark",
          description:
            "The excretory system eliminates metabolic waste products from the body through multiple organs to maintain chemical homeostasis.",
          organs: [
            {
              name: "Kidneys",
              icon: "🫘",
              fn: "Urea & toxin removal",
              desc: "Remove urea (protein metabolism waste), uric acid, creatinine, and drug metabolites from blood, excreting them in urine. Work with the urinary system to maintain electrolyte balance.",
            },
            {
              name: "Lungs",
              icon: "🫧",
              fn: "CO₂ expiration",
              desc: "Expel carbon dioxide (from cellular respiration) and water vapor through exhalation. CO₂ removal is essential for maintaining blood pH between 7.35–7.45.",
            },
            {
              name: "Skin",
              icon: "🌊",
              fn: "Salt & water via sweat",
              desc: "Sweat glands excrete water, salts (NaCl), small amounts of urea, and ammonia. During heavy exercise, up to 2–3 liters of sweat can be excreted per hour.",
            },
            {
              name: "Liver",
              icon: "🟤",
              fn: "Bile production & detox",
              desc: "Converts ammonia (toxic protein waste) to urea for renal excretion. Produces bile that carries bilirubin (hemoglobin breakdown) to the gut for fecal excretion.",
            },
            {
              name: "Large Intestine",
              icon: "⭕",
              fn: "Fecal waste elimination",
              desc: "Processes indigestible food material and excretes it as feces. Contains bilirubin (giving stool its brown color) and dead bacteria. Responsible for the final stages of water reabsorption.",
            },
            {
              name: "Lymphatic System",
              icon: "🫘",
              fn: "Cellular waste drainage",
              desc: "Collects and drains interstitial fluid containing cellular waste products, excess proteins, and debris from tissues. Filters them through lymph nodes before returning to circulation.",
            },
          ],
          stats: [
            { val: "4 systems", lbl: "Excretion pathways" },
            { val: "~2.5L", lbl: "Water excreted/day" },
            { val: "200g", lbl: "CO₂ expired/day" },
            { val: "30g", lbl: "Urea excreted/day" },
          ],
          fact: "<strong>Remarkable fact:</strong> The lungs are the most active excretory organ by volume — you exhale about 200 grams of CO₂ per day, more than the kidneys excrete of urea.",
          overlayParts: ["kidneys", "lungs", "liver"],
        },
        cardiovascular: {
          name: "Cardiovascular",
          color: "#ff3b5c",
          icon: "❤️",
          tagline: "The blood transport network",
          sketchfabEmbed:
            "https://sketchfab.com/models/1b7bfb07e6b24dd891099395ed98e989/embed?autostart=1&ui_theme=dark",
          description:
            "The cardiovascular system pumps blood throughout the body, delivering oxygen and nutrients to cells while removing carbon dioxide and metabolic waste products.",
          organs: [
            {
              name: "Heart",
              icon: "❤️",
              fn: "Dual pump, ~100K beats/day",
              desc: "A fist-sized muscular organ that pumps blood through two circuits: pulmonary (heart → lungs → heart) and systemic (heart → body → heart). Has 4 chambers: right/left atria and ventricles. Beats ~100,000 times/day.",
            },
            {
              name: "Arteries",
              icon: "🔴",
              fn: "Carry blood from heart",
              desc: "Thick-walled muscular vessels carrying oxygenated blood from the heart to tissues. The aorta is the largest artery (~2.5 cm diameter). Arterial walls contain smooth muscle that regulates blood pressure.",
            },
            {
              name: "Veins",
              icon: "🔵",
              fn: "Return blood to heart",
              desc: "Thin-walled vessels with valves that carry deoxygenated blood back to the heart. Veins hold ~70% of the body's blood volume at any given time. Valves prevent backflow in limb veins.",
            },
            {
              name: "Capillaries",
              icon: "〰️",
              fn: "Gas & nutrient exchange",
              desc: "Microscopic vessels (~1 cell thick) where the actual exchange of oxygen, nutrients, CO₂, and waste occurs between blood and tissues. If laid end-to-end, capillaries would stretch ~100,000 km.",
            },
            {
              name: "Blood",
              icon: "💉",
              fn: "Transport medium",
              desc: "A fluid connective tissue comprising plasma (55%), red blood cells (44%), white blood cells and platelets (1%). Carries O₂, CO₂, nutrients, hormones, antibodies, and heat throughout the body.",
            },
            {
              name: "Aorta",
              icon: "🔴",
              fn: "Main systemic artery",
              desc: "The largest artery, arising from the left ventricle. It arches over the heart, descends through the chest and abdomen, and branches into smaller arteries supplying the entire body.",
            },
          ],
          stats: [
            { val: "100K", lbl: "Heartbeats/day" },
            { val: "96K km", lbl: "Blood vessels" },
            { val: "5L", lbl: "Blood volume" },
            { val: "5L/min", lbl: "Cardiac output (rest)" },
          ],
          fact: "<strong>Remarkable fact:</strong> If all the blood vessels in your body were laid end to end, they would circle the Earth approximately 2.5 times — about 96,000 km.",
          overlayParts: ["heart", "vessels"],
        },
        respiratory: {
          name: "Respiratory",
          color: "#38bdf8",
          icon: "🫁",
          tagline: "The oxygen-carbon dioxide exchange system",
          sketchfabEmbed:
            "https://sketchfab.com/models/250911151757489da1cf5501b791f363/embed?autostart=1&ui_theme=dark",
          description:
            "The respiratory system enables gas exchange, bringing oxygen from air into the bloodstream while removing carbon dioxide produced by cellular metabolism.",
          organs: [
            {
              name: "Nasal Cavity",
              icon: "👃",
              fn: "Air filtering & warming",
              desc: "The first section of the respiratory tract. Filters particles via cilia and mucus, warms and humidifies air to ~37°C and ~100% humidity before it reaches the lungs.",
            },
            {
              name: "Trachea",
              icon: "⬇️",
              fn: "Air passage to lungs",
              desc: "The windpipe — a 10–16 cm tube reinforced with C-shaped cartilage rings. Divides into left and right primary bronchi at the carina. Lined with cilia that sweep particles upward.",
            },
            {
              name: "Bronchi & Bronchioles",
              icon: "🌳",
              fn: "Airway distribution tree",
              desc: "The bronchi branch 23 times from trachea to alveoli. Bronchioles (terminal airways, <1mm) lack cartilage and are controlled by smooth muscle. Asthma involves bronchiole constriction.",
            },
            {
              name: "Lungs",
              icon: "🫁",
              fn: "Main gas exchange organs",
              desc: "Two spongy organs in the chest. The right lung has 3 lobes, the left has 2 (to accommodate the heart). Together they contain ~2,400 km of airways and ~600 million alveoli.",
            },
            {
              name: "Alveoli",
              icon: "🫧",
              fn: "600M tiny gas exchange sacs",
              desc: "Microscopic air sacs (~200 μm) where gas exchange occurs. O₂ diffuses into blood; CO₂ diffuses out. The combined surface area of all alveoli equals about half a tennis court (~70 m²).",
            },
            {
              name: "Diaphragm",
              icon: "⌒",
              fn: "Primary breathing muscle",
              desc: "The dome-shaped muscle separating chest and abdomen. When it contracts (flattens), lung volume increases and air rushes in (inspiration). Relaxation allows passive exhalation.",
            },
          ],
          stats: [
            { val: "12-20", lbl: "Breaths/min" },
            { val: "600M", lbl: "Alveoli" },
            { val: "70m²", lbl: "Gas exchange area" },
            { val: "6L", lbl: "Max lung capacity" },
          ],
          fact: "<strong>Remarkable fact:</strong> Your lungs contain about 2,400 km of airways — if the airways from one lung were laid end to end, they would stretch from New York to Miami and back.",
          overlayParts: ["lungs", "trachea"],
        },
        nervous: {
          name: "Nervous",
          color: "#fbbf24",
          icon: "🧠",
          tagline: "The body's command and control network",
          sketchfabEmbed:
            "https://sketchfab.com/models/2db52ff66ee04ed1b61004b9a2d29bdf/embed?autostart=1&ui_theme=dark",
          description:
            "The nervous system processes sensory input, coordinates responses, and controls virtually all body functions through a vast network of neurons.",
          organs: [
            {
              name: "Brain",
              icon: "🧠",
              fn: "Command center, ~86B neurons",
              desc: "The most complex organ — ~1.4 kg containing ~86 billion neurons. Divided into cerebrum (higher functions), cerebellum (balance/coordination), and brainstem (autonomic functions). Uses 20% of body's energy.",
            },
            {
              name: "Spinal Cord",
              icon: "🔗",
              fn: "CNS relay highway",
              desc: "A cylinder of neural tissue (~45 cm) protected by the vertebral column. It relays signals between brain and body, and controls reflex arcs that bypass the brain for speed.",
            },
            {
              name: "Peripheral Nerves",
              icon: "〰️",
              fn: "Body-wide signal network",
              desc: "The network of nerves outside the CNS. Contains 31 pairs of spinal nerves and 12 pairs of cranial nerves. Sensory nerves carry signals to the brain; motor nerves carry commands to muscles/glands.",
            },
            {
              name: "Autonomic NS",
              icon: "⚙️",
              fn: "Unconscious body control",
              desc: 'Controls involuntary functions. The sympathetic division ("fight or flight") increases heart rate and alertness. The parasympathetic division ("rest and digest") slows heart rate and promotes digestion.',
            },
            {
              name: "Neurons",
              icon: "⚡",
              fn: "Fundamental signal cells",
              desc: "Specialized cells that transmit electrical and chemical signals. Each has dendrites (input), a cell body, and axon (output). Action potentials travel up to 120 m/s. A single neuron can connect to ~10,000 others.",
            },
            {
              name: "Cerebellum",
              icon: "🔮",
              fn: "Coordination & balance",
              desc: "Located at the back of the brain, the cerebellum contains ~50 billion neurons (over half the brain's total). It fine-tunes movement, coordinates balance, and is involved in learning motor skills.",
            },
          ],
          stats: [
            { val: "86B", lbl: "Brain neurons" },
            { val: "120 m/s", lbl: "Max signal speed" },
            { val: "20%", lbl: "Energy used by brain" },
            { val: "100T", lbl: "Neural connections" },
          ],
          fact: "<strong>Remarkable fact:</strong> The brain contains about 86 billion neurons, each connected to ~10,000 others — creating roughly 100 trillion synaptic connections, more than stars in the Milky Way galaxy.",
          overlayParts: ["brain", "spine_nerves"],
        },
      };

      // ─────────────────────────────────────────────
      // THREE.JS SCENE
      // ─────────────────────────────────────────────
      const canvas = document.getElementById("three-canvas");
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.physicallyCorrectLights = true;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 5.5);

      // Lights — warm portrait setup
      const ambient = new THREE.AmbientLight(0xffeedd, 0.6);
      scene.add(ambient);
      const keyLight = new THREE.DirectionalLight(0xfff5e0, 1.8);
      keyLight.position.set(2, 4, 5);
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight(0xaad4ff, 0.6);
      fillLight.position.set(-3, 2, 2);
      scene.add(fillLight);
      const rimLight = new THREE.DirectionalLight(0xff9966, 0.5);
      rimLight.position.set(0, -2, -4);
      scene.add(rimLight);
      const topLight = new THREE.DirectionalLight(0xffffff, 0.4);
      topLight.position.set(0, 6, 0);
      scene.add(topLight);

      // ── Body group ──
      const bodyGroup = new THREE.Group();
      scene.add(bodyGroup);

      const SKIN_COLOR = 0xc8956c;
      const BASE_COLOR = 0xc8956c;
      function overlayMat(hexColor, opacity = 0.55) {
        const c = new THREE.Color(hexColor);
        return new THREE.MeshPhongMaterial({
          color: c,
          transparent: true,
          opacity,
          side: THREE.DoubleSide,
          shininess: 80,
          emissive: c,
          emissiveIntensity: 0.25,
          depthWrite: false,
        });
      }

      // ── parts dict kept for tintBody/resetBodyColors ──
      const parts = {};

      // ── Loading overlay ──
      const loadDiv = document.createElement("div");
      loadDiv.id = "model-loading";
      loadDiv.style.cssText =
        "position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#4f9eff;font-family:Space Mono,monospace;font-size:13px;letter-spacing:.1em;z-index:20;pointer-events:none;gap:12px";
      loadDiv.innerHTML =
        '<div style="width:40px;height:40px;border:2px solid #4f9eff33;border-top-color:#4f9eff;border-radius:50%;animation:spin .8s linear infinite"></div><div>LOADING MODEL…</div>';
      document.querySelector(".canvas-area").appendChild(loadDiv);
      const spinStyle = document.createElement("style");
      spinStyle.textContent = "@keyframes spin{to{transform:rotate(360deg)}}";
      document.head.appendChild(spinStyle);

      // ── Load GLB ──
      let modelRoot = null;
      const loader = new THREE.GLTFLoader();
      loader.load(
        "human_glb.glb",
        (gltf) => {
          modelRoot = gltf.scene;

          // Auto-fit: centre + scale to ~4.5 units tall
          const box = new THREE.Box3().setFromObject(modelRoot);
          const size = new THREE.Vector3();
          box.getSize(size);
          const centre = new THREE.Vector3();
          box.getCenter(centre);
          const scale = 4.5 / Math.max(size.x, size.y, size.z);
          modelRoot.scale.setScalar(scale);
          modelRoot.position.sub(centre.multiplyScalar(scale));

          // Collect all meshes into parts{} for tinting
          modelRoot.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              // Ensure material is Phong-compatible for tinting
              if (child.material) {
                const old = child.material;
                const mat = new THREE.MeshPhongMaterial({
                  map: old.map || null,
                  color: old.color || new THREE.Color(SKIN_COLOR),
                  specular: new THREE.Color(0x3a1a0a),
                  shininess: 30,
                  normalMap: old.normalMap || null,
                  side: THREE.FrontSide,
                });
                child.material = mat;
              }
              parts[child.uuid] = child;
            }
          });

          bodyGroup.add(modelRoot);
          loadDiv.style.display = "none";
        },
        (xhr) => {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          loadDiv.querySelector("div:last-child").textContent =
            `LOADING MODEL… ${pct}%`;
        },
        (err) => {
          console.error("GLB load error:", err);
          loadDiv.querySelector("div:last-child").textContent =
            "ERROR LOADING MODEL";
          loadDiv.style.color = "#ff3b5c";
        },
      );

      // ─────────────────────────────────────────
      // ORGAN OVERLAY MESHES (hidden by default)
      // ─────────────────────────────────────────
      const overlays = {}; // systemKey -> [mesh...]

      function makeOverlay(key, meshes) {
        meshes.forEach((m) => {
          m.visible = false;
          bodyGroup.add(m);
        });
        overlays[key] = meshes;
      }

      // CARDIOVASCULAR - heart + vessels
      const heartMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 32, 32),
        overlayMat("#ff3b5c", 0.7),
      );
      heartMesh.position.set(-0.1, 0.62, 0.22);
      heartMesh.scale.set(1, 1.2, 0.85);
      heartMesh.userData.hotspotLabel = "Heart";

      const aortaMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.8, 12),
        overlayMat("#ff3b5c", 0.5),
      );
      aortaMesh.position.set(-0.05, 0.28, 0.14);
      aortaMesh.rotation.z = 0.08;
      aortaMesh.userData.hotspotLabel = "Aorta";

      makeOverlay("cardiovascular", [heartMesh, aortaMesh]);

      // RESPIRATORY - lungs + trachea
      const lungLGeo = new THREE.SphereGeometry(0.22, 32, 32);
      const lungL = new THREE.Mesh(lungLGeo, overlayMat("#38bdf8", 0.55));
      lungL.position.set(-0.24, 0.64, 0.1);
      lungL.scale.set(0.85, 1.3, 0.68);
      lungL.userData.hotspotLabel = "Left Lung";

      const lungR = new THREE.Mesh(
        lungLGeo.clone(),
        overlayMat("#38bdf8", 0.55),
      );
      lungR.position.set(0.24, 0.64, 0.1);
      lungR.scale.set(0.85, 1.3, 0.68);
      lungR.userData.hotspotLabel = "Right Lung";

      const tracheaMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.3, 12),
        overlayMat("#38bdf8", 0.6),
      );
      tracheaMesh.position.set(0, 1.02, 0.07);
      tracheaMesh.userData.hotspotLabel = "Trachea";

      makeOverlay("respiratory", [lungL, lungR, tracheaMesh]);

      // NERVOUS - brain + spinal cord
      const brainMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.34, 32, 32),
        overlayMat("#fbbf24", 0.65),
      );
      brainMesh.position.set(0, 1.82, 0);
      brainMesh.scale.set(1, 0.9, 1);
      brainMesh.userData.hotspotLabel = "Brain";

      const spinalMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 1.6, 12),
        overlayMat("#fbbf24", 0.5),
      );
      spinalMesh.position.set(0, 0.22, -0.16);
      spinalMesh.userData.hotspotLabel = "Spinal Cord";

      makeOverlay("nervous", [brainMesh, spinalMesh]);

      // DIGESTIVE - stomach + intestines + liver
      const stomachMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 32, 32),
        overlayMat("#84cc16", 0.6),
      );
      stomachMesh.position.set(-0.1, 0.14, 0.12);
      stomachMesh.scale.set(1.05, 0.88, 0.8);
      stomachMesh.userData.hotspotLabel = "Stomach";

      const liverMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 32, 32),
        overlayMat("#84cc16", 0.5),
      );
      liverMesh.position.set(0.18, 0.36, 0.09);
      liverMesh.scale.set(1.25, 0.82, 0.75);
      liverMesh.userData.hotspotLabel = "Liver";

      const intestineMesh = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.07, 12, 28),
        overlayMat("#84cc16", 0.45),
      );
      intestineMesh.position.set(0, -0.04, 0.09);
      intestineMesh.rotation.x = Math.PI * 0.15;
      intestineMesh.userData.hotspotLabel = "Intestines";

      makeOverlay("digestive", [stomachMesh, liverMesh, intestineMesh]);

      // URINARY - kidneys + bladder
      const kidneyL = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 24, 24),
        overlayMat("#f97316", 0.65),
      );
      kidneyL.position.set(-0.26, 0.1, -0.12);
      kidneyL.scale.set(0.7, 1.15, 0.7);
      kidneyL.userData.hotspotLabel = "Left Kidney";

      const kidneyR = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 24, 24),
        overlayMat("#f97316", 0.65),
      );
      kidneyR.position.set(0.26, 0.12, -0.12);
      kidneyR.scale.set(0.7, 1.15, 0.7);
      kidneyR.userData.hotspotLabel = "Right Kidney";

      const bladderMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 24, 24),
        overlayMat("#f97316", 0.55),
      );
      bladderMesh.position.set(0, -0.22, 0.09);
      bladderMesh.userData.hotspotLabel = "Bladder";

      makeOverlay("urinary", [kidneyL, kidneyR, bladderMesh]);

      // SKELETAL - highlights on bones
      const skullOverlay = new THREE.Mesh(
        new THREE.SphereGeometry(0.39, 32, 32),
        overlayMat("#94a3b8", 0.35),
      );
      skullOverlay.position.set(0, 1.82, 0);
      skullOverlay.userData.hotspotLabel = "Skull";

      const spineOverlay = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 2.1, 10),
        overlayMat("#94a3b8", 0.45),
      );
      spineOverlay.position.set(0, 0.18, -0.18);
      spineOverlay.userData.hotspotLabel = "Spine";

      // Rib cage torus
      const ribGeo = new THREE.TorusGeometry(0.38, 0.03, 8, 24);
      const ribMat = overlayMat("#94a3b8", 0.4);
      const rib1 = new THREE.Mesh(ribGeo, ribMat);
      rib1.position.set(0, 0.82, 0);
      rib1.rotation.x = Math.PI / 2;
      rib1.scale.set(0.96, 1, 0.55);
      const rib2 = new THREE.Mesh(ribGeo.clone(), ribMat.clone());
      rib2.position.set(0, 0.68, 0);
      rib2.rotation.x = Math.PI / 2;
      rib2.scale.set(1.0, 1, 0.55);
      const rib3 = new THREE.Mesh(ribGeo.clone(), ribMat.clone());
      rib3.position.set(0, 0.54, 0);
      rib3.rotation.x = Math.PI / 2;
      rib3.scale.set(1.0, 1, 0.55);
      const rib4 = new THREE.Mesh(ribGeo.clone(), ribMat.clone());
      rib4.position.set(0, 0.4, 0);
      rib4.rotation.x = Math.PI / 2;
      rib4.scale.set(0.97, 1, 0.55);
      [rib1, rib2, rib3, rib4].forEach(
        (r) => (r.userData.hotspotLabel = "Ribcage"),
      );

      makeOverlay("skeletal", [
        skullOverlay,
        spineOverlay,
        rib1,
        rib2,
        rib3,
        rib4,
      ]);

      // MUSCULAR
      const pectL = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 24, 24),
        overlayMat("#ef4444", 0.5),
      );
      pectL.position.set(-0.26, 0.72, 0.26);
      pectL.scale.set(1.05, 0.78, 0.54);
      pectL.userData.hotspotLabel = "Pectoral (L)";
      const pectR = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 24, 24),
        overlayMat("#ef4444", 0.5),
      );
      pectR.position.set(0.26, 0.72, 0.26);
      pectR.scale.set(1.05, 0.78, 0.54);
      pectR.userData.hotspotLabel = "Pectoral (R)";
      const bicepL = new THREE.Mesh(
        new THREE.SphereGeometry(0.11, 16, 16),
        overlayMat("#ef4444", 0.55),
      );
      bicepL.position.set(-0.7, 0.46, 0.05);
      bicepL.scale.set(0.8, 1.25, 0.75);
      bicepL.userData.hotspotLabel = "Bicep";
      const bicepR = new THREE.Mesh(
        new THREE.SphereGeometry(0.11, 16, 16),
        overlayMat("#ef4444", 0.55),
      );
      bicepR.position.set(0.7, 0.46, 0.05);
      bicepR.scale.set(0.8, 1.25, 0.75);
      bicepR.userData.hotspotLabel = "Bicep";
      const quadL = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 16, 16),
        overlayMat("#ef4444", 0.5),
      );
      quadL.position.set(-0.2, -0.88, 0.07);
      quadL.scale.set(0.9, 1.45, 0.7);
      quadL.userData.hotspotLabel = "Quadriceps";
      const quadR = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 16, 16),
        overlayMat("#ef4444", 0.5),
      );
      quadR.position.set(0.2, -0.88, 0.07);
      quadR.scale.set(0.9, 1.45, 0.7);
      quadR.userData.hotspotLabel = "Quadriceps";
      makeOverlay("muscular", [pectL, pectR, bicepL, bicepR, quadL, quadR]);

      // LYMPHATIC
      const spleenMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 24, 24),
        overlayMat("#10b981", 0.65),
      );
      spleenMesh.position.set(-0.3, 0.28, 0.07);
      spleenMesh.scale.set(0.8, 1.3, 0.8);
      spleenMesh.userData.hotspotLabel = "Spleen";
      const thymusMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 20, 20),
        overlayMat("#10b981", 0.6),
      );
      thymusMesh.position.set(0, 0.78, 0.18);
      thymusMesh.scale.set(1.1, 1.3, 0.8);
      thymusMesh.userData.hotspotLabel = "Thymus";
      // Node clusters
      function lymphNode(x, y, z) {
        const n = new THREE.Mesh(
          new THREE.SphereGeometry(0.05, 12, 12),
          overlayMat("#10b981", 0.7),
        );
        n.position.set(x, y, z);
        n.userData.hotspotLabel = "Lymph Node";
        return n;
      }
      const lnodes = [
        lymphNode(-0.36, 0.92, -0.04),
        lymphNode(0.36, 0.92, -0.04),
        lymphNode(-0.44, 0.24, 0),
        lymphNode(0.44, 0.24, 0),
        lymphNode(-0.24, -0.24, 0.04),
        lymphNode(0.24, -0.24, 0.04),
      ];
      makeOverlay("lymphatic", [spleenMesh, thymusMesh, ...lnodes]);

      // REPRODUCTIVE
      const repro1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 20, 20),
        overlayMat("#ec4899", 0.65),
      );
      repro1.position.set(-0.12, -0.18, 0.1);
      repro1.userData.hotspotLabel = "Reproductive Organ (L)";
      const repro2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 20, 20),
        overlayMat("#ec4899", 0.65),
      );
      repro2.position.set(0.12, -0.18, 0.1);
      repro2.userData.hotspotLabel = "Reproductive Organ (R)";
      const uterus = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 20, 20),
        overlayMat("#ec4899", 0.6),
      );
      uterus.position.set(0, -0.1, 0.09);
      uterus.scale.set(0.9, 1.1, 0.7);
      uterus.userData.hotspotLabel = "Uterus / Prostate";
      makeOverlay("reproductive", [repro1, repro2, uterus]);

      // EXCRETORY - reuse kidneys+lungs
      const exc_kidneyL = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 24, 24),
        overlayMat("#a78bfa", 0.6),
      );
      exc_kidneyL.position.set(-0.26, 0.1, -0.12);
      exc_kidneyL.scale.set(0.7, 1.15, 0.7);
      exc_kidneyL.userData.hotspotLabel = "Left Kidney";
      const exc_kidneyR = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 24, 24),
        overlayMat("#a78bfa", 0.6),
      );
      exc_kidneyR.position.set(0.26, 0.12, -0.12);
      exc_kidneyR.scale.set(0.7, 1.15, 0.7);
      exc_kidneyR.userData.hotspotLabel = "Right Kidney";
      const exc_lungL = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 32, 32),
        overlayMat("#a78bfa", 0.4),
      );
      exc_lungL.position.set(-0.24, 0.64, 0.1);
      exc_lungL.scale.set(0.85, 1.3, 0.68);
      exc_lungL.userData.hotspotLabel = "Left Lung";
      const exc_lungR = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 32, 32),
        overlayMat("#a78bfa", 0.4),
      );
      exc_lungR.position.set(0.24, 0.64, 0.1);
      exc_lungR.scale.set(0.85, 1.3, 0.68);
      exc_lungR.userData.hotspotLabel = "Right Lung";
      const exc_liver = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 32, 32),
        overlayMat("#a78bfa", 0.45),
      );
      exc_liver.position.set(0.18, 0.36, 0.09);
      exc_liver.scale.set(1.25, 0.82, 0.75);
      exc_liver.userData.hotspotLabel = "Liver";
      makeOverlay("excretory", [
        exc_kidneyL,
        exc_kidneyR,
        exc_lungL,
        exc_lungR,
        exc_liver,
      ]);

      // INTEGUMENTARY - semi-transparent skin shell over entire body
      function skinShell(geo, px, py, pz, rx, ry, rz, sx, sy, sz) {
        const m = new THREE.Mesh(geo, overlayMat("#f59e0b", 0.18));
        m.position.set(px, py, pz);
        m.rotation.set(rx, ry, rz);
        m.scale.set(sx, sy, sz);
        m.userData.hotspotLabel = "Skin";
        return m;
      }
      const skinParts = [
        skinShell(
          new THREE.SphereGeometry(0.38, 32, 32),
          0,
          1.82,
          0,
          0,
          0,
          0,
          1.02,
          1.08,
          0.96,
        ),
        skinShell(
          new THREE.SphereGeometry(0.5, 32, 32),
          0,
          0.7,
          0,
          0,
          0,
          0,
          1.18,
          1.18,
          0.82,
        ),
        skinShell(
          new THREE.SphereGeometry(0.4, 32, 32),
          0,
          0.14,
          0,
          0,
          0,
          0,
          1.02,
          0.9,
          0.76,
        ),
        skinShell(
          new THREE.SphereGeometry(0.46, 32, 32),
          0,
          -0.22,
          0,
          0,
          0,
          0,
          1.14,
          0.82,
          0.76,
        ),
      ];
      makeOverlay("integumentary", skinParts);

      // ── Particle field (background) ──
      const particleGeo = new THREE.BufferGeometry();
      const pCount = 300;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 12;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      const particles = new THREE.Points(
        particleGeo,
        new THREE.PointsMaterial({
          color: 0x4f9eff,
          size: 0.025,
          transparent: true,
          opacity: 0.4,
        }),
      );
      scene.add(particles);

      // ─────────────────────────────────────────
      // INTERACTION (Orbit Controls — manual)
      // ─────────────────────────────────────────
      let isDragging = false,
        prevMouse = { x: 0, y: 0 };
      let rotY = 0,
        rotX = 0.1;
      let targetRotY = 0,
        targetRotX = 0.1;
      let zoom = 5.5,
        targetZoom = 5.5;
      let autoRotate = true;

      canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        autoRotate = false;
        prevMouse = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener("mouseup", () => {
        isDragging = false;
      });
      window.addEventListener("mousemove", (e) => {
        if (!isDragging) {
          handleHover(e);
          return;
        }
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        targetRotY += dx * 0.012;
        targetRotX += dy * 0.01;
        targetRotX = Math.max(-1.0, Math.min(1.0, targetRotX));
        prevMouse = { x: e.clientX, y: e.clientY };
      });
      canvas.addEventListener(
        "wheel",
        (e) => {
          targetZoom += e.deltaY * 0.005;
          targetZoom = Math.max(3.0, Math.min(9.0, targetZoom));
          e.preventDefault();
        },
        { passive: false },
      );

      // Touch
      let lastTouch = null;
      canvas.addEventListener("touchstart", (e) => {
        isDragging = true;
        autoRotate = false;
        lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      });
      canvas.addEventListener("touchend", () => {
        isDragging = false;
      });
      canvas.addEventListener(
        "touchmove",
        (e) => {
          if (!lastTouch) return;
          const dx = e.touches[0].clientX - lastTouch.x;
          const dy = e.touches[0].clientY - lastTouch.y;
          targetRotY += dx * 0.012;
          targetRotX += dy * 0.01;
          lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          e.preventDefault();
        },
        { passive: false },
      );

      // View presets
      function setView(v) {
        document
          .querySelectorAll(".view-btn")
          .forEach((b) => b.classList.remove("active"));
        document.getElementById("vbtn-" + v).classList.add("active");
        autoRotate = false;
        if (v === "anterior") {
          targetRotY = 0;
          targetRotX = 0.1;
        }
        if (v === "posterior") {
          targetRotY = Math.PI;
          targetRotX = 0.1;
        }
        if (v === "lateral") {
          targetRotY = Math.PI / 2;
          targetRotX = 0.1;
        }
        setTimeout(() => (autoRotate = true), 3000);
      }

      // ─────────────────────────────────────────
      // RAYCASTING / HOVER
      // ─────────────────────────────────────────
      const raycaster = new THREE.Raycaster();
      const mouse2d = new THREE.Vector2();
      const tt = document.getElementById("tooltip3d");

      function handleHover(e) {
        const rect = canvas.getBoundingClientRect();
        mouse2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse2d, camera);
        const active = activeSystem ? overlays[activeSystem] || [] : [];
        const hits = raycaster.intersectObjects(active);

        if (hits.length > 0) {
          const label = hits[0].object.userData.hotspotLabel;
          if (label) {
            document.getElementById("tt-name").textContent = label;
            document.getElementById("tt-sys").textContent =
              (activeSystem ? SYSTEMS[activeSystem].name : "") + " System";
            tt.style.left = e.clientX + 14 + "px";
            tt.style.top = e.clientY - 10 + "px";
            tt.classList.add("show");
            canvas.style.cursor = "pointer";
            return;
          }
        }
        tt.classList.remove("show");
        canvas.style.cursor = isDragging ? "grabbing" : "grab";
      }

      // ─────────────────────────────────────────
      // PULSING ANIMATION for active overlays
      // ─────────────────────────────────────────
      let pulseT = 0;

      // ─────────────────────────────────────────
      // RESIZE
      // ─────────────────────────────────────────
      function resize() {
        const w = canvas.parentElement.clientWidth;
        const h = canvas.parentElement.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      window.addEventListener("resize", resize);
      resize();

      // ─────────────────────────────────────────
      // RENDER LOOP
      // ─────────────────────────────────────────
      let frameId;
      function animate() {
        frameId = requestAnimationFrame(animate);
        pulseT += 0.025;

        // Smooth camera
        rotY += (targetRotY - rotY) * 0.08;
        rotX += (targetRotX - rotX) * 0.08;
        zoom += (targetZoom - zoom) * 0.06;
        camera.position.set(
          Math.sin(rotY) * Math.cos(rotX) * zoom,
          Math.sin(rotX) * zoom,
          Math.cos(rotY) * Math.cos(rotX) * zoom,
        );
        camera.lookAt(0, 0.5, 0);

        if (autoRotate && !isDragging) targetRotY += 0.003;

        // Pulse active overlays
        if (activeSystem && overlays[activeSystem]) {
          const pulse = 0.75 + Math.sin(pulseT) * 0.12;
          overlays[activeSystem].forEach((m) => {
            if (m.material) m.material.emissiveIntensity = pulse * 0.3;
          });
        }

        // Subtle body bob
        bodyGroup.position.y = Math.sin(pulseT * 0.4) * 0.03;

        // Particle drift
        particles.rotation.y += 0.0003;

        renderer.render(scene, camera);
      }
      animate();

      // ─────────────────────────────────────────
      // UI FUNCTIONS
      // ─────────────────────────────────────────
      function buildSidebar() {
        const sb = document.getElementById("sidebar");
        sb.innerHTML = '<div class="sidebar-title">Body Systems</div>';
        Object.entries(SYSTEMS).forEach(([key, sys]) => {
          const btn = document.createElement("button");
          btn.className = "sys-btn";
          btn.id = "sys-btn-" + key;
          btn.style.setProperty("--sys-color", sys.color);
          btn.innerHTML = `<span class="sys-dot"></span>${sys.name}`;
          btn.onclick = () => selectSystem(key);
          sb.appendChild(btn);
        });
      }

      function selectSystem(key) {
        document
          .querySelectorAll(".sys-btn")
          .forEach((b) => b.classList.remove("active"));
        Object.values(overlays).forEach((arr) =>
          arr.forEach((m) => {
            m.visible = false;
          }),
        );

        const sfOverlay = document.getElementById("sketchfab-overlay");
        const sfIframe = document.getElementById("sf-iframe");

        // Deselect
        if (activeSystem === key) {
          activeSystem = null;
          sfOverlay.classList.remove("show");
          sfIframe.src = "";
          sfIframe.style.display = "";
          const oldEmbed = sfOverlay.querySelector(".sf-html-embed");
          if (oldEmbed) oldEmbed.remove();
          document.getElementById("empty-state").style.display = "flex";
          document.getElementById("system-info").style.display = "none";
          document.getElementById("label-text").textContent =
            "DRAG TO ROTATE · SELECT A SYSTEM";
          document.getElementById("label-text").style.color = "var(--accent)";
          selectedOrganIndex = null;
          resetBodyColors();
          return;
        }

        activeSystem = key;
        const sys = SYSTEMS[key];
        document.getElementById("sys-btn-" + key).classList.add("active");

        // Show Sketchfab embed if system has one
        if (sys.sketchfabEmbed) {
          const embed = sys.sketchfabEmbed;
          const isGendered = typeof embed === "object" && !Array.isArray(embed);
          const isHTML = typeof embed === "string" && embed.trim().startsWith("<");
          const genderToggle = document.getElementById("sf-gender-toggle");
          genderToggle.style.display = isGendered ? "flex" : "none";
          if (isGendered) {
            sfSwitchGender(activeGender, embed);
          } else if (isHTML) {
            const sfOverlayInner = document.getElementById("sketchfab-overlay");
            // Remove old html-embed if any
            const old = sfOverlayInner.querySelector(".sf-html-embed");
            if (old) old.remove();
            const wrapper = document.createElement("div");
            wrapper.className = "sf-html-embed";
            wrapper.style.cssText = "flex:1;display:flex;flex-direction:column;overflow:hidden";
            wrapper.innerHTML = embed;
            const iframeInEmbed = wrapper.querySelector("iframe");
            if (iframeInEmbed) {
              iframeInEmbed.style.cssText = "width:100%;flex:1;border:none;min-height:0";
            }
            sfIframe.style.display = "none";
            sfOverlayInner.appendChild(wrapper);
          } else {
            const old = document.querySelector(".sf-html-embed");
            if (old) old.remove();
            sfIframe.style.display = "";
            sfIframe.src = embed;
          }
          document.getElementById("sf-label").textContent =
            sys.icon + " " + sys.name.toUpperCase() + " SYSTEM";
          sfOverlay.classList.add("show");
        } else {
          sfOverlay.classList.remove("show");
          sfIframe.src = "";
          if (overlays[key])
            overlays[key].forEach((m) => {
              m.visible = true;
            });
          tintBody(sys.color);
        }

        document.getElementById("label-text").textContent =
          sys.name.toUpperCase() + " SYSTEM";
        document.getElementById("label-text").style.color = sys.color;
        renderInfo(key);
        selectedOrganIndex = null;
        autoRotate = true;
      }

      function tintBody(hexColor) {
        const c = new THREE.Color(hexColor);
        Object.values(parts).forEach((mesh) => {
          if (!mesh._origColor) mesh._origColor = mesh.material.color.clone();
          mesh.material.color.setRGB(
            mesh._origColor.r * 0.6 + c.r * 0.4,
            mesh._origColor.g * 0.6 + c.g * 0.3,
            mesh._origColor.b * 0.6 + c.b * 0.3,
          );
          mesh.material.emissive = new THREE.Color(hexColor);
          mesh.material.emissiveIntensity = 0.08;
        });
      }
      function resetBodyColors() {
        Object.values(parts).forEach((mesh) => {
          if (mesh._origColor) mesh.material.color.copy(mesh._origColor);
          mesh.material.emissiveIntensity = 0;
        });
      }

      function renderInfo(key) {
        const sys = SYSTEMS[key];
        const panel = document.getElementById("system-info");
        document.getElementById("empty-state").style.display = "none";
        panel.style.display = "flex";

        const organs = sys.gender
          ? activeGender === "male"
            ? sys.male
            : sys.female
          : sys.organs;
        const genderHTML = sys.gender
          ? `
          <div class="gender-tabs">
            <button class="gender-tab ${activeGender === "female" ? "active" : ""}" onclick="switchGender('female')">Female</button>
            <button class="gender-tab ${activeGender === "male" ? "active" : ""}" onclick="switchGender('male')">Male</button>
          </div>`
          : "";

        panel.innerHTML = `
          <div class="info-header" style="--sys-c:${sys.color};--sys-glow:${sys.color}22">
            <div class="info-tag">${sys.icon} ${sys.name}</div>
            <div class="info-title">${sys.name} System</div>
            <div class="info-subtitle">${sys.tagline}</div>
          </div>
          <div class="info-body" style="--sys-c:${sys.color};--sys-glow:${sys.color}22">
            ${genderHTML}
            <div class="info-section">
              <div class="info-section-title">Key Components</div>
              <div class="organ-list" id="organ-list">
                ${organs
                  .map(
                    (o, i) => `
                  <div class="organ-item" onclick="selectOrgan(${i})" id="organ-${i}">
                    <div class="icon">${o.icon}</div>
                    <div><div class="organ-name">${o.name}</div><div class="organ-fn">${o.fn}</div></div>
                  </div>`,
                  )
                  .join("")}
              </div>
              <div class="organ-detail" id="organ-detail">
                <button class="close-detail" onclick="closeDetail()">×</button>
                <div class="organ-detail-name" id="detail-name"></div>
                <div class="organ-detail-desc" id="detail-desc"></div>
              </div>
            </div>
            <div class="info-section">
              <div class="info-section-title">Quick Stats</div>
              <div class="stat-grid">
                ${sys.stats.map((s) => `<div class="stat-card"><div class="stat-val">${s.val}</div><div class="stat-lbl">${s.lbl}</div></div>`).join("")}
              </div>
            </div>
            <div class="info-section">
              <div class="info-section-title">Did You Know</div>
              <div class="fun-fact">${sys.fact}</div>
            </div>
          </div>`;
      }

      function selectOrgan(i) {
        const sys = SYSTEMS[activeSystem];
        const organs = sys.gender
          ? activeGender === "male"
            ? sys.male
            : sys.female
          : sys.organs;
        const organ = organs[i];
        const detail = document.getElementById("organ-detail");
        if (selectedOrganIndex === i) {
          closeDetail();
          return;
        }
        selectedOrganIndex = i;
        document
          .querySelectorAll(".organ-item")
          .forEach((el) => (el.style.borderColor = ""));
        document.getElementById("organ-" + i).style.borderColor =
          SYSTEMS[activeSystem].color;
        document.getElementById("detail-name").textContent = organ.name;
        document.getElementById("detail-desc").textContent = organ.desc;
        detail.classList.add("show");
      }
      function closeDetail() {
        selectedOrganIndex = null;
        document
          .querySelectorAll(".organ-item")
          .forEach((el) => (el.style.borderColor = ""));
        document.getElementById("organ-detail").classList.remove("show");
      }
      function switchGender(g) {
        activeGender = g;
        renderInfo(activeSystem);
      }

      function sfSwitchGender(g, embedObj) {
        activeGender = g;
        const embed =
          embedObj || (activeSystem && SYSTEMS[activeSystem].sketchfabEmbed);
        if (!embed || typeof embed !== "object") return;
        document.getElementById("sf-iframe").src = embed[g];
        const active = g === "female" ? "#ec4899" : "#ec4899";
        const fBtn = document.getElementById("sf-btn-female");
        const mBtn = document.getElementById("sf-btn-male");
        fBtn.style.background = g === "female" ? "#ec4899" : "none";
        fBtn.style.color = g === "female" ? "#fff" : "#ec4899";
        mBtn.style.background = g === "male" ? "#ec4899" : "none";
        mBtn.style.color = g === "male" ? "#fff" : "#ec4899";
        // also refresh info panel organ list
        if (activeSystem) renderInfo(activeSystem);
      }

      buildSidebar();
