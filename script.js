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
          icon: "<i class='fa-solid fa-shield-halved'></i>",
          tagline: "The body's protective outer barrier",
          sketchfabEmbed:
            "https://sketchfab.com/models/927ec094c29644ef8bff1538b4744579/embed?autostart=1&ui_theme=dark",
          description:
            "The integumentary system is the body's largest organ system, forming a continuous physical barrier against pathogens, UV radiation, dehydration, and mechanical injury while regulating temperature and enabling sensory perception.",
          organs: [
            {
              name: "Epidermis",
              icon: "<i class='fa-solid fa-layer-group'></i>",
              fn: "Outermost waterproof barrier",
              desc: "A stratified squamous epithelium 0.05–1.5 mm thick depending on body region. Its deepest layer (stratum basale) continuously divides, pushing cells upward where they flatten, fill with keratin, and eventually shed. Melanocytes here produce melanin that absorbs UV radiation and determines skin tone.",
            },
            {
              name: "Dermis",
              icon: "<i class='fa-solid fa-bars-staggered'></i>",
              fn: "Structural support layer",
              desc: "The thick layer beneath the epidermis made of dense irregular connective tissue. It houses collagen and elastin fibers that give skin its tensile strength and elasticity. The dermis also contains blood vessels, nerve endings, hair follicle roots, and gland ducts.",
            },
            {
              name: "Hair Follicles",
              icon: "<i class='fa-solid fa-wave-square'></i>",
              fn: "Hair shaft production",
              desc: "Pocket-like structures that extend from the dermis into the hypodermis. The follicle matrix cells divide rapidly to build the hair shaft from keratin. Each follicle cycles through active growth (anagen, 2–7 years), regression (catagen, 2–3 weeks), and rest (telogen, 3 months) before shedding.",
            },
            {
              name: "Eccrine Sweat Glands",
              icon: "<i class='fa-solid fa-droplet'></i>",
              fn: "Core body temperature control",
              desc: "Simple coiled tubular glands distributed across nearly the entire body surface — densest on palms, soles, and forehead. They secrete a dilute salt-water solution directly onto the skin surface. Evaporation of this sweat is the primary mechanism for dissipating excess body heat during exercise or fever.",
            },
            {
              name: "Sebaceous Glands",
              icon: "<i class='fa-solid fa-oil-can'></i>",
              fn: "Sebum secretion & skin conditioning",
              desc: "Holocrine glands attached to hair follicles that release sebum — a lipid-rich mixture of triglycerides, wax esters, and squalene. Sebum waterproofs the hair shaft, slows water loss from the skin surface, and has mild antimicrobial properties. Overproduction combined with follicle blockage is the primary cause of acne.",
            },
            {
              name: "Nails",
              icon: "<i class='fa-solid fa-hand'></i>",
              fn: "Fingertip protection & precision grip",
              desc: "Hard translucent plates of tightly packed keratin produced by the nail matrix beneath the proximal nail fold. They protect the sensitive distal phalanx from trauma and act as a rigid counter-pressure surface that dramatically improves the ability to pick up small objects. Fingernails grow approximately 3 mm per month.",
            },
          ],
          stats: [
            { val: "1.5–2 m²", lbl: "Total surface area" },
            { val: "3.5–10 kg", lbl: "Weight incl. subcutis" },
            { val: "28–30 d", lbl: "Epidermal turnover" },
            { val: "~4 million", lbl: "Sweat glands" },
          ],
          fact: "<strong>Clinical insight:</strong> The skin is the first line of defense against infection. A full-thickness burn destroying more than 20% of body surface area is life-threatening primarily because it eliminates this barrier, allowing massive fluid loss and bacterial invasion simultaneously.",
          overlayParts: ["skin"],
        },
        skeletal: {
          name: "Skeletal",
          color: "#94a3b8",
          icon: "<i class='fa-solid fa-bone'></i>",
          tagline: "The structural framework of the body",
          sketchfabEmbed:
            "https://sketchfab.com/models/0c66fa3be6584d72a455accab123f1bd/embed?autostart=1&ui_theme=dark",
          description:
            "The skeletal system provides the rigid internal framework that supports soft tissues, protects vital organs, anchors muscles for movement, houses red bone marrow for blood cell production, and serves as the body's primary mineral reservoir for calcium and phosphorus homeostasis.",
          organs: [
            {
              name: "Skull",
              icon: "<i class='fa-solid fa-skull'></i>",
              fn: "Cranial & facial bone complex",
              desc: "The skull is composed of 22 bones fused at immovable fibrous joints called sutures. The 8 cranial bones form a rigid vault (neurocranium) that encloses and protects the brain. The 14 facial bones form the orbits, nasal cavity, and jaw. The mandible is the only movable skull bone, articulating at the temporomandibular joint.",
            },
            {
              name: "Vertebral Column",
              icon: "<i class='fa-solid fa-align-center'></i>",
              fn: "Axial support & spinal cord housing",
              desc: "The spine consists of 33 vertebrae stacked in 5 regions: 7 cervical (neck), 12 thoracic (mid-back), 5 lumbar (lower back), 5 sacral (fused into the sacrum), and 4 coccygeal (fused into the coccyx). Intervertebral fibrocartilage discs between each mobile vertebra act as shock absorbers and allow the spine's range of motion.",
            },
            {
              name: "Thoracic Cage",
              icon: "<i class='fa-solid fa-grip-lines'></i>",
              fn: "Heart & lung protection",
              desc: "Formed by 12 pairs of ribs, 12 thoracic vertebrae, and the sternum. Ribs 1–7 (true ribs) attach directly to the sternum via costal cartilage. Ribs 8–10 (false ribs) attach indirectly via shared cartilage. Ribs 11–12 (floating ribs) have no anterior attachment. The cage also acts as a bellows during breathing, expanding and contracting with each breath.",
            },
            {
              name: "Pelvis",
              icon: "<i class='fa-solid fa-circle-half-stroke'></i>",
              fn: "Weight transfer & pelvic organ support",
              desc: "The bony pelvis is formed by two hip bones (each comprising the ilium, ischium, and pubis fused at the acetabulum), the sacrum, and coccyx. It transfers the entire weight of the upper body to the lower limbs and forms a protective basin for the bladder, rectum, and reproductive organs. The female pelvis is wider and shallower to accommodate childbirth.",
            },
            {
              name: "Long Bones",
              icon: "<i class='fa-solid fa-ruler'></i>",
              fn: "Lever arms for locomotion",
              desc: "Long bones such as the femur, tibia, fibula, humerus, radius, and ulna have a hollow diaphysis (shaft) of compact bone surrounding a medullary cavity filled with yellow (fatty) marrow. The expanded epiphyses at each end are covered with articular cartilage. Red marrow in the epiphyses produces blood cells throughout life.",
            },
            {
              name: "Synovial Joints",
              icon: "<i class='fa-solid fa-link'></i>",
              fn: "Freely movable articulations",
              desc: "Synovial joints are the most common and mobile joint type. A fluid-filled joint capsule lined with synovial membrane secretes synovial fluid that lubricates and nourishes the avascular articular cartilage. Subtypes include ball-and-socket (hip, shoulder), hinge (knee, elbow), pivot (radioulnar), and saddle (thumb carpometacarpal) joints.",
            },
          ],
          stats: [
            { val: "206", lbl: "Bones in adults" },
            { val: "270", lbl: "Bones at birth" },
            { val: "~360", lbl: "Total joints" },
            { val: "99%", lbl: "Body calcium stored" },
          ],
          fact: "<strong>Clinical insight:</strong> Bone is a living tissue that constantly remodels itself. Osteoclasts resorb old bone while osteoblasts deposit new matrix. This cycle replaces the entire adult skeleton approximately every 10 years and allows bone to adapt its density in response to mechanical loading.",
          overlayParts: ["skull", "spine", "ribs", "pelvis", "limbs"],
        },
        lymphatic: {
          name: "Lymphatic",
          color: "#10b981",
          icon: "<i class='fa-solid fa-shield-virus'></i>",
          tagline: "Fluid balance, immunity & fat absorption",
          sketchfabEmbed:
            "https://sketchfab.com/models/14800d739ecb46678d7584a401b0aa77/embed?autostart=1&ui_theme=dark",
          description:
            "The lymphatic system is a one-way drainage network that collects excess interstitial fluid and returns it to the bloodstream, transports dietary fats absorbed in the gut, and is the anatomical home of the adaptive immune system.",
          organs: [
            {
              name: "Lymph Nodes",
              icon: "<i class='fa-solid fa-circle-nodes'></i>",
              fn: "Immune surveillance checkpoints",
              desc: "Bean-shaped encapsulated organs ranging 1–25 mm, clustered in the neck, axilla, groin, and abdomen. Afferent vessels bring lymph in; it percolates through B-cell follicles and T-cell zones where antigens are detected and immune responses initiated. Efferent vessels carry filtered lymph toward the thoracic duct.",
            },
            {
              name: "Spleen",
              icon: "<i class='fa-solid fa-filter'></i>",
              fn: "Blood filtration & immune reservoir",
              desc: "The largest lymphoid organ (~150 g), in the left upper quadrant beneath the diaphragm. Its red pulp filters aged or damaged red blood cells and stores platelets. Its white pulp contains lymphocytes that mount immune responses to blood-borne antigens. It also acts as an emergency reservoir of red blood cells released during hemorrhage.",
            },
            {
              name: "Thymus",
              icon: "<i class='fa-solid fa-microscope'></i>",
              fn: "T-lymphocyte maturation site",
              desc: "A bilobed gland in the anterior mediastinum, largest and most active during childhood. Immature T-cells migrate here from bone marrow and undergo selection: those that recognize self-MHC survive (positive selection), while those that attack self-proteins are eliminated (negative selection), establishing immune self-tolerance.",
            },
            {
              name: "Thoracic Duct",
              icon: "<i class='fa-solid fa-route'></i>",
              fn: "Main lymph return vessel",
              desc: "The largest lymphatic vessel (~38–45 cm), originating at the cisterna chyli in the abdomen. It collects lymph from the entire body below the diaphragm and the left upper body, draining into the left subclavian vein. It also carries chylomicrons — fat particles absorbed from the small intestine — into the bloodstream.",
            },
            {
              name: "Tonsils",
              icon: "<i class='fa-solid fa-circle-dot'></i>",
              fn: "Oropharyngeal immune sentinels",
              desc: "Unencapsulated lymphoid tissue forming Waldeyer's ring around the throat entrance: palatine tonsils (sides of throat), pharyngeal tonsil/adenoid (nasopharynx), and lingual tonsil (tongue base). Their crypt-covered surface maximizes contact with inhaled and ingested antigens, triggering local IgA antibody production.",
            },
            {
              name: "Bone Marrow",
              icon: "<i class='fa-solid fa-syringe'></i>",
              fn: "Origin of all immune cells",
              desc: "Red bone marrow in flat bones and epiphyses is the site of hematopoiesis — production of all blood and immune cells from pluripotent stem cells. B-lymphocytes complete maturation here. T-lymphocyte precursors leave marrow and travel to the thymus to mature. Adults have ~2.6 kg of bone marrow, roughly half of which is red.",
            },
          ],
          stats: [
            { val: "500–700", lbl: "Lymph nodes" },
            { val: "2–3 L", lbl: "Lymph returned/day" },
            { val: "~150 g", lbl: "Spleen weight" },
            { val: "3 types", lbl: "Lymphocytes (B, T, NK)" },
          ],
          fact: "<strong>Clinical insight:</strong> When lymph nodes detect an active infection, they enlarge due to rapid lymphocyte proliferation — this is why swollen glands in the neck reliably signal throat infection. Persistent unexplained node enlargement can indicate lymphoma.",
          overlayParts: ["lymph"],
        },
        reproductive: {
          name: "Reproductive",
          color: "#ec4899",
          icon: "<i class='fa-solid fa-dna'></i>",
          tagline: "Biological system for creating life",
          sketchfabEmbed: {
            female:
              "https://sketchfab.com/models/445e5d3977d848419253a4058137555f/embed?autostart=1&ui_theme=dark",
            male: "https://sketchfab.com/models/0c8ff9f922c042d9b7d5c6d8d11f0f77/embed?autostart=1&ui_theme=dark",
          },
          description:
            "The reproductive system produces gametes, enables fertilization, and in females supports fetal development. It is governed by a hormonal axis between the hypothalamus, pituitary gland, and gonads.",
          gender: true,
          male: [
            {
              name: "Testes",
              icon: "<i class='fa-solid fa-circle'></i>",
              fn: "Sperm & testosterone production",
              desc: "Paired oval glands housed in the scrotum, kept 2–3°C below core body temperature for efficient spermatogenesis. Seminiferous tubules produce ~1,500 sperm per second. Leydig cells between the tubules secrete testosterone in response to LH from the pituitary, driving secondary sexual characteristics and libido.",
            },
            {
              name: "Epididymis",
              icon: "<i class='fa-solid fa-arrows-spin'></i>",
              fn: "Sperm maturation & storage",
              desc: "A tightly coiled 6-metre tube folded against the posterior surface of each testis. Sperm spend 2–3 weeks here acquiring forward motility and the ability to penetrate an egg. The tail of the epididymis stores mature sperm until ejaculation.",
            },
            {
              name: "Vas Deferens",
              icon: "<i class='fa-solid fa-arrow-right'></i>",
              fn: "Sperm transport duct",
              desc: "A thick-walled muscular tube (~45 cm) that propels sperm from the epididymis to the ejaculatory duct via powerful peristaltic contractions during ejaculation. It passes through the inguinal canal and loops over the ureter before joining the seminal vesicle duct.",
            },
            {
              name: "Prostate Gland",
              icon: "<i class='fa-solid fa-circle-half-stroke'></i>",
              fn: "Alkaline seminal fluid secretion",
              desc: "A walnut-sized gland (~20 g) encircling the urethra just below the bladder. It secretes a slightly acidic, zinc-rich fluid that makes up ~30% of semen volume. Prostatic secretions activate sperm motility and help neutralize the acidic vaginal environment. The prostate is the most common site of cancer in men over 50.",
            },
            {
              name: "Seminal Vesicles",
              icon: "<i class='fa-solid fa-vials'></i>",
              fn: "Fructose-rich fluid provider",
              desc: "Paired glands posterior to the bladder that contribute ~60–70% of semen volume. Their secretion is rich in fructose (energy for sperm), prostaglandins (which stimulate uterine contractions to aid sperm transport), and coagulation proteins that temporarily gel semen after ejaculation.",
            },
            {
              name: "Bulbourethral Glands",
              icon: "<i class='fa-solid fa-droplet-slash'></i>",
              fn: "Pre-ejaculatory lubrication",
              desc: "Two pea-sized glands (Cowper's glands) at the base of the penis that secrete a clear alkaline mucus before ejaculation. This pre-ejaculate neutralizes residual urine acidity in the urethra and provides lubrication, creating a safer environment for sperm passage.",
            },
          ],
          female: [
            {
              name: "Ovaries",
              icon: "<i class='fa-solid fa-egg'></i>",
              fn: "Oocyte & hormone production",
              desc: "Paired almond-shaped gonads (~3 cm) that produce oocytes and secrete estrogen and progesterone. A female is born with ~1–2 million primordial follicles; by puberty ~400,000 remain. Only ~400 will ovulate over a lifetime. Estrogen drives the follicular phase; progesterone dominates the luteal phase after ovulation.",
            },
            {
              name: "Fallopian Tubes",
              icon: "<i class='fa-solid fa-wave-square'></i>",
              fn: "Oocyte transport & fertilization site",
              desc: "Two muscular tubes (~10 cm) connecting the ovaries to the uterus. Fertilization almost always occurs in the ampulla, the widest segment. Ciliated epithelium and peristaltic contractions move the oocyte or early embryo toward the uterus over 3–5 days. Blockage of these tubes is a leading cause of female infertility.",
            },
            {
              name: "Uterus",
              icon: "<i class='fa-solid fa-house-medical'></i>",
              fn: "Implantation & fetal development",
              desc: "A hollow, thick-walled muscular organ (~7.5 cm in nulliparous women) with three layers: perimetrium (outer serosa), myometrium (smooth muscle that contracts during labor), and endometrium (inner lining that thickens under estrogen and sheds during menstruation if implantation does not occur).",
            },
            {
              name: "Cervix",
              icon: "<i class='fa-solid fa-ring'></i>",
              fn: "Uterine gateway & mucus barrier",
              desc: "The cylindrical lower segment of the uterus (~3–4 cm) that projects into the vagina. Cervical mucus changes consistency across the cycle: thick and hostile to sperm after ovulation, thin and sperm-permeable at mid-cycle. During labor it effaces and dilates to 10 cm to allow delivery.",
            },
            {
              name: "Vagina",
              icon: "<i class='fa-solid fa-circle-notch'></i>",
              fn: "Birth canal & seminal receptacle",
              desc: "A fibromuscular tube (~8–10 cm) extending from the cervix to the vulva. Its rugae (folds) allow expansion during intercourse and childbirth. Lactobacillus bacteria maintain a pH of 3.8–4.5, inhibiting pathogen growth. It serves as the birth canal, the exit for menstrual flow, and receives sperm during intercourse.",
            },
            {
              name: "Mammary Glands",
              icon: "<i class='fa-solid fa-droplet'></i>",
              fn: "Milk synthesis & secretion",
              desc: "Modified apocrine sweat glands organized into 15–20 lobes of secretory alveoli. During pregnancy, rising prolactin and placental hormones develop the glandular tissue. After delivery, prolactin drives milk production and oxytocin triggers milk ejection (let-down reflex). Colostrum secreted in the first days is rich in IgA antibodies.",
            },
          ],
          stats: [
            { val: "~400", lbl: "Lifetime ovulations" },
            { val: "200–500M", lbl: "Sperm per ejaculate" },
            { val: "38–40 wk", lbl: "Gestation period" },
            { val: "28 d", lbl: "Avg. menstrual cycle" },
          ],
          fact: "<strong>Clinical insight:</strong> The human egg (oocyte) is the largest cell in the body at ~120 μm — just visible to the naked eye. Of the ~200 million sperm that enter the vagina, fewer than 200 reach the fallopian tube, and only one fertilizes the egg.",
          overlayParts: ["pelvis_organs"],
        },
        muscular: {
          name: "Muscular",
          color: "#ef4444",
          icon: "<i class='fa-solid fa-dumbbell'></i>",
          tagline: "The engine of movement, posture & heat",
          sketchfabEmbed:
            "https://sketchfab.com/models/7ea21567ff9942bf9511e2d99efe85d9/embed?autostart=1&ui_theme=dark",
          description:
            "The muscular system comprises over 600 named skeletal muscles plus cardiac and smooth muscle. Together they generate all body movement, maintain posture against gravity, produce ~85% of body heat, and propel substances through hollow organs.",
          organs: [
            {
              name: "Skeletal Muscle",
              icon: "<i class='fa-solid fa-dumbbell'></i>",
              fn: "Voluntary movement & posture",
              desc: "Striated, multinucleated fibers attached to bone via tendons. Contraction is triggered by motor neurons releasing acetylcholine at the neuromuscular junction, causing actin-myosin cross-bridge cycling. Fiber types range from slow-twitch (fatigue-resistant, oxidative) to fast-twitch (powerful, glycolytic). Makes up ~40% of body mass in men.",
            },
            {
              name: "Cardiac Muscle",
              icon: "<i class='fa-solid fa-heart-pulse'></i>",
              fn: "Involuntary, continuous heart pumping",
              desc: "Striated but involuntary, found exclusively in the myocardium. Cardiomyocytes are branched and connected by intercalated discs containing gap junctions that spread electrical impulses instantly across the heart wall, ensuring coordinated contraction. Highly fatigue-resistant due to dense mitochondria and constant aerobic metabolism.",
            },
            {
              name: "Smooth Muscle",
              icon: "<i class='fa-solid fa-wave-square'></i>",
              fn: "Involuntary organ & vessel movement",
              desc: "Non-striated, spindle-shaped cells controlled by the autonomic nervous system and local hormones. Found in blood vessels, airways, GI tract, bladder, and uterus. Responsible for peristalsis, vasoconstriction, bronchodilation, and bladder emptying. Contracts slowly but sustains contraction for long periods.",
            },
            {
              name: "Tendons",
              icon: "<i class='fa-solid fa-link'></i>",
              fn: "Force transmission to bone",
              desc: "Dense regular connective tissue composed almost entirely of parallel collagen type I fibers. They transmit tensile force of muscle contraction to the skeleton with minimal energy loss. The Achilles tendon, the body's largest, can withstand loads over 10 times body weight during running.",
            },
            {
              name: "Diaphragm",
              icon: "<i class='fa-solid fa-lungs'></i>",
              fn: "Primary muscle of breathing",
              desc: "A dome-shaped sheet of skeletal muscle separating the thoracic and abdominal cavities. During inspiration it contracts and flattens, increasing thoracic volume and drawing air into the lungs. Innervated by the phrenic nerve (C3–5). Paralysis of the diaphragm requires mechanical ventilation.",
            },
            {
              name: "Gluteus Maximus",
              icon: "<i class='fa-solid fa-person-running'></i>",
              fn: "Largest muscle, hip extension",
              desc: "The largest muscle in the body by volume, forming the bulk of the buttock. Primary extensor and external rotator of the hip, critical for climbing stairs, rising from a chair, and running. Relatively inactive during level walking but powerfully recruited during uphill locomotion and explosive movements.",
            },
          ],
          stats: [
            { val: "600+", lbl: "Named skeletal muscles" },
            { val: "~40%", lbl: "Body mass (male)" },
            { val: "85%", lbl: "Body heat produced" },
            { val: "0.1 ms", lbl: "Contraction onset" },
          ],
          fact: "<strong>Clinical insight:</strong> Muscle atrophy begins within 72 hours of immobilization — bedridden patients can lose up to 5% of muscle mass per day. This is why early mobilization after surgery or illness is a core principle of modern rehabilitation.",
          overlayParts: ["muscles"],
        },
        urinary: {
          name: "Urinary",
          color: "#f97316",
          icon: "<i class='fa-solid fa-kidneys'></i>",
          tagline: "Blood filtration, fluid & electrolyte balance",
          sketchfabEmbed:
            "https://sketchfab.com/models/4c9f8c0b084e4b8192936495563f92a7/embed?autostart=1&ui_theme=dark",
          description:
            "The urinary system filters ~180 L of blood per day, excretes metabolic waste in urine, precisely regulates blood volume, electrolyte concentrations, and pH, and produces hormones including erythropoietin and renin.",
          organs: [
            {
              name: "Kidneys",
              icon: "<i class='fa-solid fa-kidneys'></i>",
              fn: "Blood filtration & homeostasis",
              desc: "Two retroperitoneal organs (~150 g each) with a cortex and medulla. Each contains ~1 million nephrons that collectively filter ~180 L of plasma per day, reabsorbing 99% and excreting 1–2 L as urine. They also regulate blood pressure via the renin-angiotensin-aldosterone system and stimulate red blood cell production via erythropoietin.",
            },
            {
              name: "Nephrons",
              icon: "<i class='fa-solid fa-microscope'></i>",
              fn: "Microscopic filtration units",
              desc: "The functional unit of the kidney. Each nephron consists of a glomerulus (high-pressure filtration capillary), Bowman's capsule, proximal convoluted tubule (bulk reabsorption), loop of Henle (concentration gradient), distal convoluted tubule (fine-tuning), and collecting duct (final water reabsorption under ADH control).",
            },
            {
              name: "Ureters",
              icon: "<i class='fa-solid fa-arrow-down-long'></i>",
              fn: "Urine transport to bladder",
              desc: "Two muscular tubes (~25–30 cm) lined with transitional epithelium. Peristaltic contractions every 10–15 seconds propel urine from the renal pelvis to the bladder. They enter the bladder at an oblique angle, creating a valve effect that prevents urine reflux when bladder pressure rises.",
            },
            {
              name: "Urinary Bladder",
              icon: "<i class='fa-solid fa-circle'></i>",
              fn: "Urine storage reservoir",
              desc: "A hollow muscular organ with a wall of smooth muscle (detrusor) that can stretch to hold 400–600 mL. Stretch receptors signal the urge to void at ~150–200 mL. Micturition requires coordinated relaxation of the internal urethral sphincter (involuntary) and external urethral sphincter (voluntary).",
            },
            {
              name: "Urethra",
              icon: "<i class='fa-solid fa-minus'></i>",
              fn: "Urine expulsion channel",
              desc: "The terminal tube for urine excretion. In females it is ~4 cm, opening anterior to the vagina. In males it is ~20 cm, passing through the prostate and penis, and also serves as the ejaculatory channel. The external urethral sphincter provides voluntary control of urination.",
            },
            {
              name: "Adrenal Glands",
              icon: "<i class='fa-solid fa-triangle-exclamation'></i>",
              fn: "Stress hormones & fluid regulation",
              desc: "Paired glands sitting atop each kidney. The cortex produces aldosterone (promotes Na+ and water retention, raising blood pressure), cortisol (stress response, anti-inflammatory), and androgens. The medulla produces adrenaline (epinephrine) and noradrenaline for the fight-or-flight response.",
            },
          ],
          stats: [
            { val: "180 L", lbl: "Plasma filtered/day" },
            { val: "1–2 L", lbl: "Urine produced/day" },
            { val: "2 million", lbl: "Total nephrons" },
            { val: "7.35–7.45", lbl: "Blood pH maintained" },
          ],
          fact: "<strong>Clinical insight:</strong> The kidneys filter the entire blood volume approximately 60 times per day. In chronic kidney disease, this filtration rate falls progressively — dialysis is required when it drops below ~10–15% of normal to prevent fatal waste accumulation.",
          overlayParts: ["kidneys", "bladder"],
        },
        digestive: {
          name: "Digestive",
          color: "#84cc16",
          icon: "<i class='fa-solid fa-utensils'></i>",
          tagline: "Mechanical & chemical nutrient processing",
          sketchfabEmbed:
            "https://sketchfab.com/models/584766fd58684369b166611faec98e04/embed?autostart=1&ui_theme=dark",
          description:
            "The digestive system is a 9-metre tube from mouth to anus that mechanically and chemically breaks down food into absorbable molecules, absorbs nutrients and water into the bloodstream, and expels indigestible residue.",
          organs: [
            {
              name: "Mouth & Esophagus",
              icon: "<i class='fa-solid fa-teeth'></i>",
              fn: "Ingestion, mastication & swallowing",
              desc: "Digestion begins in the mouth: teeth mechanically break food while salivary amylase begins starch hydrolysis. The tongue forms a bolus and initiates swallowing. The esophagus propels the bolus to the stomach via coordinated peristaltic waves in ~8 seconds. The lower esophageal sphincter prevents gastric acid reflux.",
            },
            {
              name: "Stomach",
              icon: "<i class='fa-solid fa-jar'></i>",
              fn: "Acid digestion & chyme formation",
              desc: "A J-shaped muscular organ that stores and churns food for 2-6 hours. Parietal cells secrete HCl (pH 1.5-3.5) that denatures proteins and kills pathogens. Chief cells secrete pepsinogen, activated to pepsin by acid, which begins protein digestion. The result is a semi-liquid called chyme released in controlled pulses into the duodenum.",
            },
            {
              name: "Small Intestine",
              icon: "<i class='fa-solid fa-wave-square'></i>",
              fn: "Primary site of digestion & absorption",
              desc: "A ~6-7 m tube divided into duodenum, jejunum, and ileum. Villi and microvilli (brush border) amplify absorptive surface area to ~250 m2. Bile from the liver emulsifies fats; pancreatic enzymes complete carbohydrate, protein, and fat digestion. ~90% of all nutrient absorption occurs here.",
            },
            {
              name: "Large Intestine",
              icon: "<i class='fa-solid fa-circle-notch'></i>",
              fn: "Water reabsorption & waste compaction",
              desc: "A ~1.5 m tube (cecum, colon, rectum) that reabsorbs water and electrolytes from indigestible residue, compacting it into feces. Houses ~38 trillion bacteria (the gut microbiome) that ferment dietary fiber, produce short-chain fatty acids, and synthesize vitamins K and B12. Transit time is 24-72 hours.",
            },
            {
              name: "Liver",
              icon: "<i class='fa-solid fa-liver'></i>",
              fn: "Central metabolic & detox organ",
              desc: "The largest internal organ (~1.5 kg), performing over 500 functions. It produces bile (stored in the gallbladder) for fat emulsification, metabolizes absorbed nutrients from the portal vein, detoxifies drugs and alcohol, synthesizes plasma proteins and clotting factors, stores glycogen, and converts ammonia to urea.",
            },
            {
              name: "Pancreas",
              icon: "<i class='fa-solid fa-pancreas'></i>",
              fn: "Digestive enzymes & blood glucose control",
              desc: "A dual-function gland. Its exocrine acinar cells secrete ~1.5 L/day of enzyme-rich juice (lipase, amylase, proteases) into the duodenum. Its endocrine islets of Langerhans secrete insulin (lowers blood glucose) and glucagon (raises blood glucose) directly into the bloodstream.",
            },
          ],
          stats: [
            { val: "~9 m", lbl: "Total GI tract length" },
            { val: "250 m2", lbl: "Small intestine surface" },
            { val: "38 trillion", lbl: "Gut bacteria" },
            { val: "24-72 h", lbl: "Transit time" },
          ],
          fact: "<strong>Clinical insight:</strong> The gut microbiome - ~38 trillion bacteria in the large intestine - weighs about 1.5 kg and influences immunity, mood (via the gut-brain axis), and metabolic health. Disruption of this community (dysbiosis) is linked to IBD, obesity, and depression.",
          overlayParts: ["stomach", "intestines", "liver"],
        },
        excretory: {
          name: "Excretory",
          color: "#a78bfa",
          icon: "<i class='fa-solid fa-recycle'></i>",
          tagline: "Multi-organ metabolic waste elimination",
          sketchfabEmbed:
            "https://sketchfab.com/models/ab00c534954d435eb6a3c6c36173b9f7/embed?autostart=1&ui_theme=dark",
          description:
            "The excretory system eliminates metabolic waste through four main routes: kidneys (urea, creatinine), lungs (CO2, water vapor), skin (salts, urea via sweat), and intestines (bilirubin, undigested matter) to maintain chemical homeostasis.",
          organs: [
            {
              name: "Kidneys",
              icon: "<i class='fa-solid fa-kidneys'></i>",
              fn: "Urea, creatinine & toxin excretion",
              desc: "The primary excretory organs, filtering ~180 L of plasma daily. They excrete urea (end product of protein catabolism), uric acid (purine breakdown), creatinine (muscle metabolism), and drug metabolites. Each nephron precisely regulates what is retained versus excreted based on the body needs.",
            },
            {
              name: "Lungs",
              icon: "<i class='fa-solid fa-lungs'></i>",
              fn: "CO2 & water vapor expiration",
              desc: "Expel carbon dioxide produced by cellular respiration and water vapor through exhalation. CO2 is transported in blood as bicarbonate (70%), bound to hemoglobin (23%), and dissolved (7%). Its removal is essential for maintaining blood pH between 7.35-7.45 - even small deviations cause respiratory acidosis or alkalosis.",
            },
            {
              name: "Skin",
              icon: "<i class='fa-solid fa-shield-halved'></i>",
              fn: "Salt, water & minor waste via sweat",
              desc: "Eccrine sweat glands excrete water, NaCl, small amounts of urea (~0.5 g/day), lactic acid, and ammonia. During heavy exercise in heat, sweat rate can reach 2-3 L/hour. While a minor excretory route compared to kidneys, sweating is critical for thermoregulation and contributes to electrolyte balance.",
            },
            {
              name: "Liver",
              icon: "<i class='fa-solid fa-liver'></i>",
              fn: "Ammonia detox & bilirubin excretion",
              desc: "Converts toxic ammonia (from amino acid catabolism) to urea via the urea cycle for renal excretion. Breaks down hemoglobin from old red blood cells into bilirubin, which is secreted in bile and excreted in feces (giving stool its brown color). Also detoxifies drugs, alcohol, and hormones.",
            },
            {
              name: "Large Intestine",
              icon: "<i class='fa-solid fa-circle-notch'></i>",
              fn: "Fecal waste & bilirubin elimination",
              desc: "Receives indigestible food residue, dead bacteria, and bile pigments (bilirubin) from the small intestine. Compacts this material into feces by reabsorbing water. Defecation eliminates solid waste including undigested fiber, dead gut bacteria (~30% of fecal mass), and metabolic byproducts.",
            },
            {
              name: "Lymphatic System",
              icon: "<i class='fa-solid fa-shield-virus'></i>",
              fn: "Cellular debris & interstitial waste drainage",
              desc: "Collects interstitial fluid containing cellular waste products, excess proteins, and tissue debris that cannot re-enter blood capillaries directly. Lymph nodes filter this fluid, removing pathogens and cellular debris, before returning clean lymph to the bloodstream via the thoracic duct.",
            },
          ],
          stats: [
            { val: "4 routes", lbl: "Excretion pathways" },
            { val: "~2.5 L", lbl: "Water excreted/day" },
            { val: "~200 g", lbl: "CO2 expired/day" },
            { val: "~30 g", lbl: "Urea excreted/day" },
          ],
          fact: "<strong>Clinical insight:</strong> The lungs are the most active excretory organ by mass - exhaling ~200 g of CO2 per day. In respiratory failure, CO2 accumulates in blood causing respiratory acidosis, which can be fatal within minutes if untreated.",
          overlayParts: ["kidneys", "lungs", "liver"],
        },
        cardiovascular: {
          name: "Cardiovascular",
          color: "#ff3b5c",
          icon: "<i class='fa-solid fa-heart-pulse'></i>",
          tagline: "Closed-loop blood transport network",
          sketchfabEmbed:
            "https://sketchfab.com/models/1b7bfb07e6b24dd891099395ed98e989/embed?autostart=1&ui_theme=dark",
          description:
            "The cardiovascular system is a closed circuit that pumps ~5 L of blood continuously through ~96,000 km of vessels, delivering O2 and nutrients to every cell while removing CO2 and metabolic waste.",
          organs: [
            {
              name: "Heart",
              icon: "<i class='fa-solid fa-heart-pulse'></i>",
              fn: "Dual-circuit muscular pump",
              desc: "A fist-sized, 4-chambered muscular organ (~300 g) that beats ~100,000 times/day. The right side pumps deoxygenated blood to the lungs (pulmonary circuit); the left side pumps oxygenated blood to the body (systemic circuit). The sinoatrial node generates the electrical impulse that initiates each heartbeat at 60-100 bpm at rest.",
            },
            {
              name: "Arteries",
              icon: "<i class='fa-solid fa-circle-arrow-right'></i>",
              fn: "High-pressure blood distribution",
              desc: "Thick-walled vessels with elastic and muscular walls that carry blood away from the heart under high pressure. The aorta (~2.5 cm diameter) is the largest. Arterial smooth muscle contracts and relaxes to regulate blood pressure and direct blood flow to active tissues. Atherosclerosis (plaque buildup) in arteries is the leading cause of heart attack and stroke.",
            },
            {
              name: "Veins",
              icon: "<i class='fa-solid fa-circle-arrow-left'></i>",
              fn: "Low-pressure blood return to heart",
              desc: "Thin-walled vessels with one-way valves that return deoxygenated blood to the heart under low pressure. Veins act as a blood reservoir, holding ~70% of total blood volume at rest. Skeletal muscle contractions and respiratory pressure changes assist venous return. Valve failure causes varicose veins.",
            },
            {
              name: "Capillaries",
              icon: "<i class='fa-solid fa-wave-square'></i>",
              fn: "Tissue-level exchange vessels",
              desc: "Microscopic vessels just one endothelial cell thick (~8-10 micrometers diameter). The actual exchange of O2, CO2, nutrients, hormones, and waste occurs here by diffusion and osmosis. Their combined surface area is ~6,000 m2. If laid end-to-end, the body capillaries would stretch ~100,000 km.",
            },
            {
              name: "Blood",
              icon: "<i class='fa-solid fa-droplet'></i>",
              fn: "Multifunctional transport fluid",
              desc: "A fluid connective tissue (~5 L total). Plasma (55%) carries nutrients, hormones, and waste. Red blood cells (44%) contain hemoglobin that binds O2 in the lungs and releases it in tissues. White blood cells (immune defense) and platelets (clotting) make up the remaining 1%. Blood also distributes heat and maintains pH via bicarbonate buffering.",
            },
            {
              name: "Aorta",
              icon: "<i class='fa-solid fa-circle-arrow-up'></i>",
              fn: "Main systemic artery",
              desc: "The largest artery in the body (~2.5 cm diameter, ~30 cm long), arising from the left ventricle. It arches superiorly (aortic arch), giving off branches to the head and arms, then descends through the thorax and abdomen, branching into the iliac arteries supplying the pelvis and legs. Its elastic walls absorb systolic pressure and recoil to maintain diastolic flow.",
            },
          ],
          stats: [
            { val: "100,000", lbl: "Heartbeats/day" },
            { val: "96,000 km", lbl: "Total vessel length" },
            { val: "5 L", lbl: "Blood volume" },
            { val: "5 L/min", lbl: "Cardiac output (rest)" },
          ],
          fact: "<strong>Clinical insight:</strong> The heart pumps ~7,000 L of blood per day. Coronary artery disease - blockage of the arteries supplying the heart muscle itself - is the world leading cause of death, responsible for ~9 million deaths annually.",
          overlayParts: ["heart", "vessels"],
        },
        respiratory: {
          name: "Respiratory",
          color: "#38bdf8",
          icon: "<i class='fa-solid fa-lungs'></i>",
          tagline: "Gas exchange between air and blood",
          sketchfabEmbed:
            "https://sketchfab.com/models/250911151757489da1cf5501b791f363/embed?autostart=1&ui_theme=dark",
          description:
            "The respiratory system brings O2 from atmospheric air into the bloodstream and expels CO2 produced by cellular metabolism, maintaining blood pH and enabling aerobic energy production in every cell.",
          organs: [
            {
              name: "Nasal Cavity",
              icon: "<i class='fa-solid fa-wind'></i>",
              fn: "Air filtration, warming & humidification",
              desc: "The primary entry point for air. Nasal hairs and mucus trap particles >10 micrometers. The highly vascular turbinate bones warm air to ~37 degrees C and humidify it to ~100% relative humidity before it reaches the delicate lung tissue. The olfactory epithelium in the roof detects odors via ~10 million receptor cells.",
            },
            {
              name: "Trachea",
              icon: "<i class='fa-solid fa-minus'></i>",
              fn: "Rigid airway to the lungs",
              desc: "The windpipe - a 10-16 cm tube reinforced by 16-20 C-shaped hyaline cartilage rings that prevent collapse during inhalation. The posterior membranous wall allows the esophagus to expand during swallowing. Pseudostratified ciliated epithelium (the mucociliary escalator) sweeps trapped particles upward to be swallowed or expelled.",
            },
            {
              name: "Bronchi & Bronchioles",
              icon: "<i class='fa-solid fa-tree'></i>",
              fn: "Branching airway distribution tree",
              desc: "The trachea divides into left and right primary bronchi at the carina (T4-5 level). These branch 23 times, progressively losing cartilage and narrowing. Terminal bronchioles (~0.5 mm) are the last purely conducting airways. Smooth muscle in bronchioles regulates airflow; spasm causes the wheeze of asthma.",
            },
            {
              name: "Lungs",
              icon: "<i class='fa-solid fa-lungs'></i>",
              fn: "Primary gas exchange organs",
              desc: "Two spongy organs filling most of the thoracic cavity. The right lung has 3 lobes; the left has 2 with a cardiac notch accommodating the heart. Together they contain ~2,400 km of airways, ~600 million alveoli, and a gas exchange surface of ~70 m2. At rest, ~500 mL of air moves per breath.",
            },
            {
              name: "Alveoli",
              icon: "<i class='fa-solid fa-circle-dot'></i>",
              fn: "Microscopic gas exchange sacs",
              desc: "~600 million thin-walled air sacs (~200 micrometers diameter) where gas exchange occurs. Type I pneumocytes form the ultra-thin exchange surface (0.2 micrometers). Type II pneumocytes secrete surfactant that reduces surface tension and prevents alveolar collapse. O2 diffuses into pulmonary capillaries; CO2 diffuses out, driven by partial pressure gradients.",
            },
            {
              name: "Diaphragm",
              icon: "<i class='fa-solid fa-arrows-up-down'></i>",
              fn: "Primary muscle of breathing",
              desc: "A dome-shaped skeletal muscle sheet separating the thoracic and abdominal cavities. During inspiration, it contracts and descends ~1.5 cm, increasing thoracic volume by ~500 mL and creating negative pressure that draws air in. Innervated by the phrenic nerve (C3-C5). Accounts for ~70% of the work of quiet breathing.",
            },
          ],
          stats: [
            { val: "12-20", lbl: "Breaths/min (rest)" },
            { val: "600 million", lbl: "Alveoli" },
            { val: "70 m2", lbl: "Gas exchange area" },
            { val: "6 L", lbl: "Total lung capacity" },
          ],
          fact: "<strong>Clinical insight:</strong> Surfactant deficiency in premature infants causes Respiratory Distress Syndrome - alveoli collapse with each breath. Synthetic surfactant therapy, introduced in the 1990s, reduced premature infant mortality by ~40%.",
          overlayParts: ["lungs", "trachea"],
        },
        nervous: {
          name: "Nervous",
          color: "#fbbf24",
          icon: "<i class='fa-solid fa-brain'></i>",
          tagline: "Electrochemical command & control network",
          sketchfabEmbed:
            "https://sketchfab.com/models/2db52ff66ee04ed1b61004b9a2d29bdf/embed?autostart=1&ui_theme=dark",
          description:
            "The nervous system is the body command center, processing sensory input, coordinating motor output, and regulating all physiological functions through electrical and chemical signals transmitted by ~86 billion neurons.",
          organs: [
            {
              name: "Brain",
              icon: "<i class='fa-solid fa-brain'></i>",
              fn: "Central command, cognition & integration",
              desc: "The most complex structure known - ~1.4 kg containing ~86 billion neurons and ~85 billion glial cells. The cerebral cortex (cognition, sensation, movement) has ~16 billion neurons. The cerebellum (coordination) contains ~69 billion. The brainstem controls vital autonomic functions (breathing, heart rate, blood pressure). The brain consumes 20% of the body energy despite being 2% of its mass.",
            },
            {
              name: "Spinal Cord",
              icon: "<i class='fa-solid fa-signal'></i>",
              fn: "CNS relay highway & reflex center",
              desc: "A cylinder of neural tissue (~45 cm, ~1 cm diameter) protected by the vertebral column and three meningeal layers. It relays sensory signals ascending to the brain and motor commands descending to muscles. Reflex arcs (e.g., knee-jerk) are processed entirely within the spinal cord, bypassing the brain for speed. Complete transection causes permanent paralysis below the injury level.",
            },
            {
              name: "Peripheral Nerves",
              icon: "<i class='fa-solid fa-network-wired'></i>",
              fn: "Body-wide signal transmission network",
              desc: "31 pairs of spinal nerves and 12 pairs of cranial nerves form the peripheral nervous system. Sensory (afferent) fibers carry signals from receptors to the CNS. Motor (efferent) fibers carry commands from the CNS to muscles and glands. The sciatic nerve, the body largest, runs from the lumbar spine to the foot and is ~2 cm wide at its origin.",
            },
            {
              name: "Autonomic NS",
              icon: "<i class='fa-solid fa-gear'></i>",
              fn: "Involuntary physiological regulation",
              desc: "Controls involuntary functions via two opposing divisions. The sympathetic division prepares the body for stress: increases heart rate, dilates pupils, redirects blood to muscles, and inhibits digestion. The parasympathetic division promotes rest and recovery: slows heart rate, stimulates digestion, and constricts pupils. The enteric nervous system in the gut wall operates semi-independently.",
            },
            {
              name: "Neurons",
              icon: "<i class='fa-solid fa-bolt'></i>",
              fn: "Fundamental electrochemical signal cells",
              desc: "Specialized cells that transmit information via action potentials - rapid reversals of membrane voltage caused by Na+ and K+ ion flows. Each neuron has dendrites (receive input), a cell body (integrates signals), and an axon (transmits output). Signals travel at 0.5-120 m/s depending on myelination. A single cortical neuron can form ~10,000 synaptic connections.",
            },
            {
              name: "Cerebellum",
              icon: "<i class='fa-solid fa-circle-nodes'></i>",
              fn: "Movement coordination & motor learning",
              desc: "Located at the posterior base of the brain, the cerebellum contains ~69 billion neurons - more than the rest of the brain combined. It receives copies of motor commands and sensory feedback, comparing intended vs. actual movement and issuing corrections in real time. Essential for balance, fine motor control, and learning new motor skills. Damage causes ataxia (uncoordinated movement).",
            },
          ],
          stats: [
            { val: "86 billion", lbl: "Brain neurons" },
            { val: "120 m/s", lbl: "Max signal speed" },
            { val: "20%", lbl: "Body energy used by brain" },
            { val: "100 trillion", lbl: "Synaptic connections" },
          ],
          fact: "<strong>Clinical insight:</strong> The brain has ~100 trillion synaptic connections. Alzheimer disease progressively destroys these connections, beginning in the hippocampus (memory) and spreading to the cortex, affecting ~50 million people worldwide and representing the most common cause of dementia.",
          overlayParts: ["brain", "spine_nerves"],
        },
      };

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
          const isGendered = typeof embed === "object";
          const genderToggle = document.getElementById("sf-gender-toggle");
          genderToggle.style.display = isGendered ? "flex" : "none";
          if (isGendered) {
            sfSwitchGender(activeGender, embed);
          } else {
            sfIframe.src = embed;
          }
          document.getElementById("sf-label").innerHTML =
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
        const embed = activeSystem && SYSTEMS[activeSystem].sketchfabEmbed;
        if (embed && typeof embed === "object") {
          document.getElementById("sf-iframe").src = embed[g];
          const fBtn = document.getElementById("sf-btn-female");
          const mBtn = document.getElementById("sf-btn-male");
          fBtn.style.background = g === "female" ? "#ec4899" : "none";
          fBtn.style.color = g === "female" ? "#fff" : "#ec4899";
          mBtn.style.background = g === "male" ? "#ec4899" : "none";
          mBtn.style.color = g === "male" ? "#fff" : "#ec4899";
        }
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
