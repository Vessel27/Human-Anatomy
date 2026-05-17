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
        name: "Hypodermis",
        icon: "<i class='fa-solid fa-layer-group'></i>",
        fn: "Fat storage and insulation layer",
        desc: "The hypodermis (also called the subcutaneous layer or subcutis) is the deepest layer beneath the skin, composed mainly of loose connective tissue and adipose (fat) cells. It cushions and insulates the body, stores energy, anchors the skin to underlying muscles and bones, and serves as a pathway for nerves and blood vessels traveling to the skin.",
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
    example: `
            <strong>Skin:</strong>
            <ul style="margin: 6px 0 12px 0; padding-left: 18px; line-height: 1.7;">
              <li><strong>Contact Dermatitis</strong> — An inflammatory skin reaction triggered by direct contact with an irritant (e.g. detergents, chemicals) or allergen (e.g. nickel, latex), causing localized redness, itching, swelling, and blistering at the site of exposure.</li>
              <li><strong>Melanoma</strong> — A malignant tumor arising from melanocytes, the pigment-producing cells of the epidermis. It is the most dangerous form of skin cancer due to its rapid growth and high potential to spread (metastasize) to lymph nodes and distant organs if not caught early.</li>
            </ul>
            <strong>Hair:</strong>
            <ul style="margin: 6px 0 12px 0; padding-left: 18px; line-height: 1.7;">
              <li><strong>Alopecia Areata</strong> — An autoimmune disorder in which the body's immune system mistakenly attacks hair follicles, resulting in sudden, patchy, non-scarring hair loss on the scalp, face, or body. It can progress to total scalp (alopecia totalis) or full body hair loss (alopecia universalis).</li>
              <li><strong>Androgenic Alopecia</strong> — The most common cause of hair loss in both sexes, driven by genetic sensitivity of hair follicles to dihydrotestosterone (DHT). It produces a predictable pattern of progressive miniaturization and thinning — receding hairline and crown thinning in men; diffuse thinning over the crown in women.</li>
            </ul>
            <strong>Nail:</strong>
            <ul style="margin: 6px 0 4px 0; padding-left: 18px; line-height: 1.7;">
              <li><strong>Onycholysis</strong> — The painless separation of the nail plate from the underlying nail bed, beginning at the free edge and progressing proximally. It creates a white, opaque area under the nail and can result from trauma, prolonged water exposure, fungal or bacterial infection, thyroid disease, or psoriasis.</li>
              <li><strong>Onychomycosis</strong> — A chronic fungal infection of the nail (most commonly caused by dermatophytes) that leads to nail thickening, yellow-brown or white discoloration, crumbling, brittleness, and distortion of the nail plate. It is the most prevalent nail disorder in adults, accounting for about 50% of all nail disease.</li>
            </ul>
          `,
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
        name: "Bones",
        icon: "<i class='fa-solid fa-bone'></i>",
        fn: "Framework, support & mineral storage",
        desc: "Hard, living structures that form the rigid framework of the body. Bones provide structural support, protect internal organs (e.g. the skull shelters the brain, the ribcage guards the heart and lungs), store minerals such as calcium and phosphorus, house red bone marrow for blood cell production, and work together with muscles to produce movement.",
      },
      {
        name: "Cartilage",
        icon: "<i class='fa-solid fa-circle-half-stroke'></i>",
        fn: "Smooth, flexible joint cushioning",
        desc: "A smooth and flexible connective tissue found at joints and between bones. Cartilage reduces friction between moving joint surfaces, absorbs mechanical shock, and provides structural support to body parts that need flexibility rather than rigidity — such as the nose, ears, trachea, and intervertebral discs.",
      },
      {
        name: "Joints",
        icon: "<i class='fa-solid fa-link'></i>",
        fn: "Points of movement & articulation",
        desc: "Structures where two or more bones meet, allowing movement and flexibility throughout the body. Different joint types are specialized for different ranges of motion: hinge joints (elbow, knee) allow bending and straightening; ball-and-socket joints (hip, shoulder) permit rotation in multiple directions; and pivot joints (neck) enable rotational movement around a single axis.",
      },
      {
        name: "Ligaments",
        icon: "<i class='fa-solid fa-grip-lines'></i>",
        fn: "Bone-to-bone stabilizers",
        desc: "Strong bands of dense fibrous connective tissue that connect bones to other bones across a joint. Ligaments stabilize joints, guide normal movement patterns, and help prevent excessive or abnormal motion that could cause dislocation or injury. They contain some elasticity but are primarily designed for tensile strength.",
      },
      {
        name: "Tendons",
        icon: "<i class='fa-solid fa-ruler'></i>",
        fn: "Muscle-to-bone force transmission",
        desc: "Tough cords of dense regular connective tissue that attach muscles to bones. When a muscle contracts, tendons transmit that pulling force directly to the skeleton, producing movement. The Achilles tendon — the body's largest — connects the calf muscles to the heel bone and can withstand forces exceeding ten times body weight during running.",
      },
    ],
    stats: [
      { val: "206", lbl: "Bones in adults" },
      { val: "~300", lbl: "Bones at birth" },
      { val: "~360", lbl: "Total joints" },
      { val: "99%", lbl: "Body calcium stored" },
    ],
    fact: "<strong>Clinical insight:</strong> Bone is a living tissue that constantly remodels itself. Osteoclasts resorb old bone while osteoblasts deposit new matrix. This cycle replaces the entire adult skeleton approximately every 10 years and allows bone to adapt its density in response to mechanical loading.",
    example: `
            <ul style="margin: 6px 0 4px 0; padding-left: 18px; line-height: 1.7;">
              <li><strong>Osteoporosis</strong> — A systemic skeletal disease characterized by low bone mass and deterioration of bone microarchitecture, leading to increased fragility and risk of fracture. It occurs when bone resorption outpaces bone formation, most commonly in postmenopausal women and older adults. Vertebrae, hips, and wrists are the most frequently fractured sites.</li>
              <li><strong>Bursitis</strong> — Inflammation of a bursa, a small fluid-filled sac that cushions bones, tendons, and muscles near joints. It typically results from repetitive motion, prolonged pressure, or sudden injury, causing localized pain, swelling, and restricted movement. Commonly affects the shoulder, elbow, hip, and knee.</li>
              <li><strong>Arthritis</strong> — A broad term encompassing over 100 conditions involving joint inflammation. Osteoarthritis involves the breakdown of protective cartilage, causing pain and stiffness. Rheumatoid arthritis is an autoimmune form where the immune system attacks the synovial lining of joints, leading to progressive joint damage and deformity.</li>
              <li><strong>Lupus (SLE)</strong> — Systemic Lupus Erythematosus is a chronic autoimmune disease in which the immune system attacks healthy tissue throughout the body, including joints, skin, kidneys, heart, and brain. Musculoskeletal symptoms such as joint pain, swelling, and morning stiffness are among the most common manifestations, affecting over 90% of patients.</li>
              <li><strong>Sjögren's Syndrome</strong> — A systemic autoimmune disorder in which immune cells attack and destroy the glands that produce moisture — primarily the salivary and lacrimal (tear) glands. Beyond dry eyes and mouth, it frequently causes joint pain and swelling, fatigue, and can affect other organs. It often occurs alongside other autoimmune diseases such as rheumatoid arthritis or lupus.</li>
            </ul>
          `,
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
        name: "Lymph",
        icon: "<i class='fa-solid fa-droplet'></i>",
        fn: "Clear fluid of the lymphatic system",
        desc: "A clear, colorless fluid derived from interstitial fluid that circulates through lymphatic vessels. It contains lymphocytes, proteins, fats, and waste products. Lymph helps maintain fluid balance, transports absorbed fats from the digestive tract, and supports immune defense by carrying white blood cells throughout the body.",
      },
      {
        name: "Lymphatic Vessels",
        icon: "<i class='fa-solid fa-route'></i>",
        fn: "Fluid collection & transport network",
        desc: "A network of thin-walled vessels that collect excess tissue fluid and return it to the bloodstream. These vessels contain valves that prevent backflow and transport lymph through lymph nodes for filtration. Specialized lymphatic capillaries in the small intestine, called lacteals, absorb dietary fats and fat-soluble vitamins.",
      },
      {
        name: "Lymph Nodes",
        icon: "<i class='fa-solid fa-circle-nodes'></i>",
        fn: "Immune filtration & surveillance",
        desc: "Small, bean-shaped lymphoid organs located along lymphatic vessels, commonly found in the neck, armpits, and groin. They contain macrophages and lymphocytes that filter lymph, destroy pathogens, and activate immune responses against infections and foreign substances.",
      },
      {
        name: "Spleen",
        icon: "<i class='fa-solid fa-filter'></i>",
        fn: "Blood filtration & immune reservoir",
        desc: "The largest lymphoid organ (~150 g), located in the left upper quadrant beneath the diaphragm. Its red pulp filters aged or damaged red blood cells and stores platelets, while its white pulp contains lymphocytes that respond to blood-borne antigens and support immune defense.",
      },
      {
        name: "Thymus",
        icon: "<i class='fa-solid fa-microscope'></i>",
        fn: "T-lymphocyte maturation site",
        desc: "A bilobed lymphoid organ located behind the sternum in the mediastinum. It is most active during childhood and is responsible for the maturation and differentiation of T lymphocytes (T cells), which are essential for adaptive immunity. The thymus gradually decreases in size with age through a process called involution.",
      },
      {
        name: "Tonsils",
        icon: "<i class='fa-solid fa-circle-dot'></i>",
        fn: "First-line pharyngeal immune defense",
        desc: "Masses of lymphoid tissue located around the pharynx, including the palatine, pharyngeal, and lingual tonsils. They act as the body's first line of immune defense against pathogens entering through the mouth and nose by trapping and exposing microbes to immune cells.",
      },
      {
        name: "Bone Marrow",
        icon: "<i class='fa-solid fa-syringe'></i>",
        fn: "Origin & maturation site of blood cells",
        desc: "Soft, vascular connective tissue found inside bones, especially the sternum, ribs, pelvis, and femur. Red bone marrow is the primary site of hematopoiesis, producing red blood cells, white blood cells, and platelets. It also serves as the maturation site for B lymphocytes.",
      },
    ],
    stats: [
      { val: "500–700", lbl: "Lymph nodes" },
      { val: "2–3 L", lbl: "Lymph returned/day" },
      { val: "~150 g", lbl: "Spleen weight" },
      { val: "3 types", lbl: "Lymphocytes (B, T, NK)" },
    ],
    fact: "<strong>Clinical insight:</strong> When lymph nodes detect an active infection, they enlarge due to rapid lymphocyte proliferation — this is why swollen glands in the neck reliably signal throat infection. Persistent unexplained node enlargement can indicate lymphoma.",
    example: `
            <ul style="margin: 6px 0 4px 0; padding-left: 18px; line-height: 1.7;">
              <li><strong>Lymphadenopathy</strong> — A condition in which lymph nodes become swollen or enlarged, most commonly as a result of infection, inflammation, or cancer. It can be localized (affecting nodes in one region) or generalized (widespread), and serves as an important clinical sign of underlying disease activity.</li>
              <li><strong>Intestinal Lymphangiectasia</strong> — A disorder in which the lymphatic vessels of the small intestine become abnormally dilated or damaged, leading to leakage and loss of lymph into the gut. This results in the loss of proteins (including albumin and gamma globulins) and lymphocytes, causing malnutrition, swelling, and immune deficiency.</li>
              <li><strong>Lymphocytosis</strong> — A condition characterized by a higher-than-normal number of lymphocytes in the bloodstream. It commonly occurs in response to viral infections (such as mononucleosis), certain bacterial infections, or chronic lymphocytic leukemia, and indicates that the immune system is actively responding to a threat.</li>
              <li><strong>Lymphatic Filariasis</strong> — A parasitic infection caused by thread-like filarial worms (most commonly Wuchereria bancrofti) transmitted through mosquito bites. The parasites lodge in and obstruct the lymphatic vessels, causing the system to malfunction and leading to severe, disfiguring swelling of the limbs and genitals known as elephantiasis.</li>
              <li><strong>Lymphoma</strong> — A cancer of the lymphatic system that originates when lymphocytes (B cells or T cells) grow and multiply uncontrollably. The two main types are Hodgkin lymphoma (characterized by the presence of Reed-Sternberg cells) and Non-Hodgkin lymphoma (a broader group of lymphoid cancers). Common signs include painless swollen lymph nodes, fever, night sweats, and unexplained weight loss.</li>
            </ul>
          `,
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
        name: "Scrotum",
        icon: "<i class='fa-solid fa-bag-shopping'></i>",
        fn: "Testicular protection & temperature regulation",
        desc: "A pouch of skin and muscle that surrounds and protects the testes. It regulates testicular temperature by contracting (via the cremaster muscle) when cold and relaxing when warm, maintaining conditions approximately 2–3°C below core body temperature necessary for normal sperm production.",
      },
      {
        name: "Penis",
        icon: "<i class='fa-solid fa-mars'></i>",
        fn: "Copulation, ejaculation & urination",
        desc: "The external male copulatory organ composed of three cylinders of erectile tissue: two corpora cavernosa and one corpus spongiosum surrounding the urethra. During arousal, increased blood flow engorges these tissues producing erection. It functions in sexual intercourse, ejaculation of semen, and expulsion of urine from the body.",
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
        name: "Ejaculatory Ducts",
        icon: "<i class='fa-solid fa-right-to-bracket'></i>",
        fn: "Semen delivery into the urethra",
        desc: "Short paired ducts (~2 cm each) formed by the union of the vas deferens and the seminal vesicle ducts on each side. They pass through the prostate gland and open into the prostatic urethra, transporting the combined fluid of sperm and seminal vesicle secretions during ejaculation.",
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
        icon: "<i class='fa-solid fa-venus'></i>",
        fn: "Birth canal & seminal receptacle",
        desc: "A fibromuscular tube (~8–10 cm) extending from the cervix to the vulva. Its rugae (folds) allow expansion during intercourse and childbirth. Lactobacillus bacteria maintain a pH of 3.8–4.5, inhibiting pathogen growth. It serves as the birth canal, the exit for menstrual flow, and receives sperm during intercourse.",
      },
      {
        name: "Mammary Glands",
        icon: "<i class='fa-solid fa-baby'></i>",
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
    example: `
    <strong>Male:</strong>
    <ul style="margin: 6px 0 12px 0; padding-left: 18px; line-height: 1.7;">
      <li><strong>Testicular Cancer</strong> — A malignant tumor arising from the germ cells of the testis, making it the most common cancer in males aged 15–35. It typically presents as a painless testicular lump or swelling. Highly treatable when detected early, with survival rates exceeding 95% for localized disease.</li>
      <li><strong>Penile Cancer</strong> — A rare malignancy of the skin or tissues of the penis, most commonly squamous cell carcinoma. Risk factors include HPV infection, phimosis, smoking, and poor hygiene. It presents as a growth, sore, or discoloration on the penis and is treated with surgery, radiation, or chemotherapy.</li>
      <li><strong>Prostate Cancer</strong> — The most common cancer in men over 50, arising from glandular cells of the prostate. It often grows slowly and may cause urinary symptoms such as weak stream, frequent urination, or difficulty starting urination. Advanced disease can spread to bones and lymph nodes. PSA screening allows early detection.</li>
      <li><strong>Erectile Dysfunction</strong> — The persistent inability to achieve or maintain an erection sufficient for satisfactory sexual intercourse. It can result from vascular disease, diabetes, hormonal imbalances, neurological conditions, psychological factors, or medications. It is often an early indicator of underlying cardiovascular disease.</li>
      <li><strong>Priapism</strong> — A prolonged, painful erection lasting more than four hours that occurs without sexual stimulation and does not resolve with orgasm. It results from impaired blood outflow from the erectile tissue and constitutes a urological emergency — without prompt treatment, permanent erectile dysfunction can result from ischemic tissue damage.</li>
    </ul>
    <strong>Female:</strong>
    <ul style="margin: 6px 0 4px 0; padding-left: 18px; line-height: 1.7;">
      <li><strong>Endometriosis</strong> — A condition in which endometrial-like tissue grows outside the uterus, commonly on the ovaries, fallopian tubes, or pelvic lining. The displaced tissue responds to hormonal cycles just as the uterine lining does — thickening, breaking down, and bleeding — but has no way to exit, causing inflammation, scarring, severe pelvic pain, and infertility.</li>
      <li><strong>Polycystic Ovary Syndrome (PCOS)</strong> — A hormonal disorder characterized by enlarged ovaries containing multiple small follicular cysts, irregular or absent menstrual cycles, elevated androgen levels (causing hirsutism and acne), and insulin resistance. It is one of the most common causes of female infertility and is associated with long-term metabolic complications.</li>
      <li><strong>Uterine Fibroids</strong> — Noncancerous smooth muscle tumors (leiomyomas) of the uterine wall that affect up to 70% of women by age 50. Depending on size and location, they may cause heavy or prolonged menstrual bleeding, pelvic pressure or pain, urinary frequency, and complications in pregnancy such as preterm labor or miscarriage.</li>
      <li><strong>Ovarian Cysts</strong> — Fluid-filled sacs that develop on or within the ovaries, most commonly as functional cysts arising during the normal ovulatory cycle. Most resolve spontaneously without treatment. However, large, persistent, or ruptured cysts can cause sudden sharp pelvic pain, bloating, and menstrual irregularities, and may require surgical intervention.</li>
      <li><strong>Cervical Cancer</strong> — A malignant tumor of the cervix strongly associated with persistent infection by high-risk strains of the human papillomavirus (HPV). It develops slowly from precancerous dysplastic changes detectable by Pap smear. Symptoms in advanced disease include abnormal vaginal bleeding (especially post-coital), unusual discharge, and pelvic pain. HPV vaccination is highly effective for prevention.</li>
    </ul>
  `,
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
        name: "Fascia",
        icon: "<i class='fa-solid fa-layer-group'></i>",
        fn: "Supportive connective tissue layer",
        desc: "Sheets or bands of connective tissue that surround, support, and separate muscles and muscle groups. Fascia helps reduce friction between muscles and provides structural support throughout the body.",
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
    example: `
      <div style="line-height:1.6;">
        <ul style="margin:6px 0 4px 0; padding-left:18px;">
          <li><strong>Amyotrophic lateral sclerosis (ALS)</strong> — A progressive neurodegenerative disease that destroys motor neurons in the brain and spinal cord, causing progressive muscle weakness, wasting, and eventual paralysis.</li>
          <li><strong>Fibromyalgia</strong> — A chronic disorder characterized by widespread musculoskeletal pain, fatigue, sleep disturbances, and cognitive symptoms; thought to involve central sensitization of pain pathways.</li>
          <li><strong>Myopathies</strong> — A heterogeneous group of primary muscle diseases (genetic or metabolic) that produce muscle weakness and structural/biochemical abnormalities of muscle fibers.</li>
          <li><strong>Myositis</strong> — Inflammatory muscle diseases (e.g., polymyositis, dermatomyositis) marked by immune-mediated muscle inflammation, weakness, and elevated muscle enzymes.</li>
          <li><strong>Tendinitis</strong> — Inflammation or irritation of a tendon typically caused by overuse or acute injury, producing localized pain, tenderness, and reduced function.</li>
        </ul>
      </div>
    `,
    overlayParts: ["muscles"],
  },
  urinary: {
    name: "Urinary",
    color: "#f97316",
    icon: "<i class='fa-solid fa-droplet'></i>",
    tagline: "Blood filtration, fluid & electrolyte balance",
    sketchfabEmbed:
      "https://sketchfab.com/models/fbdc1d3b14454cacbf353ba21246b7b2/embed?autostart=1&ui_theme=dark",
    description:
      "The urinary system filters ~180 L of blood per day, excretes metabolic waste in urine, precisely regulates blood volume, electrolyte concentrations, and pH, and produces hormones including erythropoietin and renin.",
    organs: [
      {
        name: "Kidneys",
        icon: "<i class='fa-solid fa-filter'></i>",
        fn: "Blood filtration & homeostasis",
        desc: "Two retroperitoneal organs (~150 g each) with a cortex and medulla. Each contains ~1 million nephrons that collectively filter ~180 L of plasma per day, reabsorbing 99% and excreting 1–2 L as urine. They also regulate blood pressure via the renin-angiotensin-aldosterone system and stimulate red blood cell production via erythropoietin.",
      },
      {
        name: "Renal Cortex",
        icon: "<i class='fa-solid fa-layer-group'></i>",
        fn: "Outer region; primary filtration site",
        desc: "The outer region of the kidney containing the renal corpuscles and convoluted tubules of the nephrons. It is the primary site of blood filtration and the initial formation of filtrate from the bloodstream.",
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
        icon: "<i class='fa-solid fa-droplet'></i>",
        fn: "Urine storage reservoir",
        desc: "A hollow muscular organ with a wall of smooth muscle (detrusor) that can stretch to hold 400–600 mL. Stretch receptors signal the urge to void at ~150–200 mL. Micturition requires coordinated relaxation of the internal urethral sphincter (involuntary) and external urethral sphincter (voluntary).",
      },
      {
        name: "Urethra",
        icon: "<i class='fa-solid fa-arrow-right-long'></i>",
        fn: "Urine expulsion channel",
        desc: "The terminal tube for urine excretion. In females it is ~4 cm, opening anterior to the vagina. In males it is ~20 cm, passing through the prostate and penis, and also serves as the ejaculatory channel. The external urethral sphincter provides voluntary control of urination.",
      },
      {
        name: "Adrenal Glands",
        icon: "<i class='fa-solid fa-bolt'></i>",
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
    example: `
      <div style="line-height:1.6;">
        <ul style="margin:6px 0 4px 0; padding-left:18px;">
          <li><strong>Urinary Tract Infection (UTI)</strong> — A bacterial infection affecting any part of the urinary system, commonly the bladder or urethra. Symptoms may include painful urination, frequent urination, fever, and cloudy urine.</li>
          <li><strong>Kidney Stones (Renal Calculi)</strong> — Hard mineral and salt deposits that form in the kidneys due to concentrated urine. They can block urine flow and cause severe flank pain, nausea, and blood in the urine.</li>
          <li><strong>Chronic Kidney Disease (CKD)</strong> — A progressive loss of kidney function over time, often caused by diabetes or hypertension. It impairs the kidneys' ability to filter wastes and maintain fluid and electrolyte balance.</li>
          <li><strong>Glomerulonephritis</strong> — Inflammation of the glomeruli, the filtering units of the kidneys, usually caused by infections or autoimmune disorders. It may result in blood or protein in the urine, swelling, and reduced kidney function.</li>
          <li><strong>Urinary Incontinence</strong> — Loss of voluntary control of urination due to weakened pelvic muscles, nerve damage, or bladder dysfunction. It may cause accidental leakage of urine during physical activity or sudden urges to urinate.</li>
        </ul>
      </div>
    `,
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
        name: "Mouth",
        icon: "<i class='fa-solid fa-teeth'></i>",
        fn: "Ingestion & mechanical digestion",
        desc: "The first stage of digestion begins in the mouth. Teeth mechanically break food into smaller pieces through mastication (chewing). Salivary glands secrete saliva containing salivary amylase, which begins breaking down starch (carbohydrates) into simpler sugars. The tongue mixes food with saliva and forms a bolus, which is then swallowed.",
      },
      {
        name: "Esophagus",
        icon: "<i class='fa-solid fa-arrow-down'></i>",
        fn: "Bolus transport to stomach",
        desc: "A muscular tube (~25 cm long) that transports the swallowed bolus from the pharynx to the stomach. Coordinated peristaltic waves (involuntary muscle contractions) propel the bolus downward in approximately 5-8 seconds. The lower esophageal sphincter (LES) is a muscular ring that relaxes to allow food entry into the stomach and then contracts to prevent gastric acid reflux back into the esophagus.",
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
        icon: "<i class='fa-solid fa-filter'></i>",
        fn: "Central metabolic & detox organ",
        desc: "The largest internal organ (~1.5 kg), performing over 500 functions. It produces bile (stored in the gallbladder) for fat emulsification, metabolizes absorbed nutrients from the portal vein, detoxifies drugs and alcohol, synthesizes plasma proteins and clotting factors, stores glycogen, and converts ammonia to urea.",
      },
      {
        name: "Pancreas",
        icon: "<i class='fa-solid fa-capsules'></i>",
        fn: "Digestive enzymes & blood glucose control",
        desc: "A dual-function gland. Its exocrine acinar cells secrete ~1.5 L/day of enzyme-rich juice (lipase, amylase, proteases) into the duodenum. Its endocrine islets of Langerhans secrete insulin (lowers blood glucose) and glucagon (raises blood glucose) directly into the bloodstream.",
      },
      {
        name: "Gallbladder",
        icon: "<i class='fa-solid fa-droplet'></i>",
        fn: "Bile storage & concentration",
        desc: "A small sac beneath the liver that stores and concentrates bile before releasing it into the small intestine to aid fat digestion.",
      },
      {
        name: "Rectum",
        icon: "<i class='fa-solid fa-circle-notch'></i>",
        fn: "Fecal storage before elimination",
        desc: "The terminal portion of the large intestine that stores feces before elimination.",
      },
      {
        name: "Anus",
        icon: "<i class='fa-solid fa-minus'></i>",
        fn: "Defecation opening",
        desc: "The external opening of the digestive tract controlled by internal and external anal sphincters that regulate defecation.",
      },
    ],
    stats: [
      { val: "~9 m", lbl: "Total GI tract length" },
      { val: "250 m2", lbl: "Small intestine surface" },
      { val: "38 trillion", lbl: "Gut bacteria" },
      { val: "24-72 h", lbl: "Transit time" },
    ],
    fact: "<strong>Clinical insight:</strong> The gut microbiome - ~38 trillion bacteria in the large intestine - weighs about 1.5 kg and influences immunity, mood (via the gut-brain axis), and metabolic health. Disruption of this community (dysbiosis) is linked to IBD, obesity, and depression.",
    example: `<div style="line-height:1.6;">
  <ul style="margin:6px 0 4px 0; padding-left:18px;">
    <li><strong>Acid Reflux and GERD</strong> — Stomach acid that flows into your esophagus causes indigestion and heartburn.</li>
    <li><strong>Celiac Disease</strong> — This is an autoimmune disorder that's triggered when you eat gluten, a type of protein.</li>
    <li><strong>Diverticulosis and Diverticulitis</strong> — These conditions happen when little pouches (diverticula) develop in your colon.</li>
    <li><strong>Gastroenteritis (Stomach Flu)</strong> — Stomach flu is a viral infection in your stomach and intestines.</li>
    <li><strong>Hemorrhoids</strong> — Swollen veins inside of your rectum or outside of your anus can itch and hurt.</li>
  </ul>
</div>`,
    overlayParts: ["stomach", "intestines", "liver"],
  },
  endocrine: {
    name: "Endocrine",
    color: "#f59e0b",
    icon: "<i class='fa-solid fa-ring'></i>",
    tagline: "Hormonal coordination of physiology",
    sketchfabEmbed:
      "https://sketchfab.com/models/b10f70cacb6946da851e5696291398a5/embed?autostart=1&ui_theme=dark",
    description:
      "The endocrine system is a network of glands that secrete hormones into the bloodstream to regulate growth, metabolism, reproduction, stress responses, and homeostasis.",
    organs: [
      {
        name: "Hypothalamus",
        icon: "<i class='fa-solid fa-brain'></i>",
        fn: "Neuroendocrine control center",
        desc: "A region of the brain that links the nervous and endocrine systems by controlling hormone release from the pituitary gland and maintaining homeostasis.",
      },
      {
        name: "Pituitary gland",
        icon: "<i class='fa-solid fa-star'></i>",
        fn: "Master gland regulation",
        desc: "Known as the 'master gland,' it secretes hormones that regulate growth, reproduction, metabolism, and the activity of other endocrine glands.",
      },
      {
        name: "Pineal gland",
        icon: "<i class='fa-solid fa-moon'></i>",
        fn: "Melatonin secretion",
        desc: "A small gland in the brain that produces melatonin, a hormone that regulates sleep-wake cycles and circadian rhythms.",
      },
      {
        name: "Thyroid gland",
        icon: "<i class='fa-solid fa-feather'></i>",
        fn: "Metabolic rate control",
        desc: "A butterfly-shaped gland in the neck that produces hormones controlling metabolism, growth, and energy production.",
      },
      {
        name: "Parathyroid glands",
        icon: "<i class='fa-solid fa-vial'></i>",
        fn: "Calcium & phosphate regulation",
        desc: "Small glands located behind the thyroid that regulate calcium and phosphate levels in the blood through parathyroid hormone (PTH).",
      },
      {
        name: "Adrenal glands",
        icon: "<i class='fa-solid fa-shield-halved'></i>",
        fn: "Stress & electrolyte hormones",
        desc: "Paired glands located above the kidneys that produce hormones involved in stress response, metabolism, blood pressure regulation, and electrolyte balance.",
      },
      {
        name: "Pancreas",
        icon: "<i class='fa-solid fa-capsules'></i>",
        fn: "Glucose-regulating hormones",
        desc: "A gland that functions in both digestion and endocrine regulation by producing insulin and glucagon to control blood glucose levels.",
      },
      {
        name: "Ovaries",
        icon: "<i class='fa-solid fa-venus'></i>",
        fn: "Female sex hormones",
        desc: "Female reproductive glands that produce estrogen and progesterone, regulating the menstrual cycle, pregnancy, and female secondary sexual characteristics.",
      },
      {
        name: "Testes",
        icon: "<i class='fa-solid fa-mars'></i>",
        fn: "Male sex hormones",
        desc: "Male reproductive glands that produce testosterone, which regulates sperm production and male secondary sexual characteristics.",
      },
      {
        name: "Thymus",
        icon: "<i class='fa-solid fa-shield-virus'></i>",
        fn: "Immune-endocrine organ",
        desc: "A lymphatic and endocrine organ that secretes hormones important for the development and maturation of T lymphocytes in the immune system.",
      },
    ],
    stats: [
      { val: "10 glands", lbl: "Major glands listed" },
      { val: "Whole-body", lbl: "Systemic signaling" },
      { val: "Hormones", lbl: "Chemical messengers" },
      { val: "Seconds→days", lbl: "Signal duration range" },
    ],
    fact: "<strong>Clinical insight:</strong> Hormones act at distant sites to coordinate growth, metabolism, reproduction, and stress responses; small changes in hormone levels can have large physiological effects.",
    example: `<div style="line-height:1.6;">
  <ul style="margin:6px 0 4px 0; padding-left:18px;">
    <li><strong>Diabetes Mellitus</strong> — A disorder in which the body cannot properly regulate blood sugar levels due to insufficient insulin production or insulin resistance.</li>
    <li><strong>Hyperthyroidism</strong> — A condition caused by excessive production of thyroid hormones, leading to rapid metabolism, weight loss, and increased heart rate.</li>
    <li><strong>Hypothyroidism</strong> — A disorder in which the thyroid gland produces too little thyroid hormone, causing fatigue, weight gain, and slowed metabolism.</li>
    <li><strong>Cushing’s Syndrome</strong> — A hormonal disorder caused by prolonged exposure to high levels of cortisol, resulting in weight gain, high blood pressure, and muscle weakness.</li>
    <li><strong>Addison’s Disease</strong> — A condition in which the adrenal glands produce insufficient hormones, especially cortisol and aldosterone, leading to fatigue, low blood pressure, and weakness.</li>
  </ul>
</div>`,
    overlayParts: ["hypothalamus", "pituitary", "thyroid", "adrenals", "pancreas", "ovaries", "testes", "thymus"],
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
    ],
    stats: [
      { val: "100,000", lbl: "Heartbeats/day" },
      { val: "96,000 km", lbl: "Total vessel length" },
      { val: "5 L", lbl: "Blood volume" },
      { val: "5 L/min", lbl: "Cardiac output (rest)" },
    ],
    fact: "<strong>Clinical insight:</strong> The heart pumps ~7,000 L of blood per day. Coronary artery disease - blockage of the arteries supplying the heart muscle itself - is the world leading cause of death, responsible for ~9 million deaths annually.",
    example: `<div style="line-height:1.6;">
  <ul style="margin:6px 0 4px 0; padding-left:18px;">
    <li><strong>Hypertension</strong> — A condition characterized by persistently high blood pressure, increasing the risk of heart disease and stroke.</li>
    <li><strong>Coronary Artery Disease (CAD)</strong> — Narrowing or blockage of the coronary arteries due to plaque buildup, reducing blood flow to the heart muscle.</li>
    <li><strong>Heart Failure</strong> — A disorder in which the heart cannot pump blood effectively to meet the body's needs.</li>
    <li><strong>Arrhythmia</strong> — An abnormal heart rhythm caused by irregular electrical activity in the heart.</li>
    <li><strong>Stroke</strong> — A condition caused by interrupted blood flow to the brain, leading to brain cell damage and loss of function.</li>
  </ul>
</div>`,
    overlayParts: ["heart", "vessels"],
  },
  respiratory: {
    name: "Respiratory",
    color: "#38bdf8",
    icon: "<i class='fa-solid fa-lungs'></i>",
    tagline: "Gas exchange between air and blood",
    sketchfabEmbed:
      "https://sketchfab.com/models/e167afeba10a4711a8d6b0b59358cc44/embed?autostart=1&ui_theme=dark",
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
        name: "Pharynx",
        icon: "<i class='fa-solid fa-arrow-down'></i>",
        fn: "Air and Food passageway",
        desc: "Muscular passage that carries air from the nose to the larynx. Also functions in swallowing by directing food toward the esophagus.",
      },
      {
        name: "Larynx",
        icon: "<i class='fa-solid fa-microphone'></i>",
        fn: "Voice production & airway protection",
        desc: "The 'voice box' that contains the vocal cords and protects the airway during swallowing. The epiglottis covers the laryngeal opening when swallowing to prevent food from entering the lungs.",
      },
      {
        name: "Trachea",
        icon: "<i class='fa-solid fa-wind'></i>",
        fn: "Rigid airway to the lungs",
        desc: "The windpipe - a 10-16 cm tube reinforced by 16-20 C-shaped hyaline cartilage rings that prevent collapse during inhalation. The posterior membranous wall allows the esophagus to expand during swallowing. Pseudostratified ciliated epithelium (the mucociliary escalator) sweeps trapped particles upward to be swallowed or expelled.",
      },
      {
        name: "Bronchi",
        icon: "<i class='fa-solid fa-tree'></i>",
        fn: "Main air passages to lungs",
        desc: "Two main air passages that branch from the trachea into each lung. The left and right primary bronchi divide at the carina, with the right being more vertical and shorter, while the left is more horizontal.",
      },
      {
        name: "Bronchioles",
        icon: "<i class='fa-solid fa-leaf'></i>",
        fn: "Smaller airway branches",
        desc: "Smaller branches of the bronchi that distribute air within the lungs. They progressively lose cartilage and are the terminal conducting airways. Smooth muscle in bronchioles regulates airflow; spasm causes the wheeze of asthma.",
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
    example: `<div style="line-height:1.6;">
  <ul style="margin:6px 0 4px 0; padding-left:18px;">
    <li><strong>Asthma</strong> — A chronic condition in which the airways become inflamed and narrowed, causing wheezing, coughing, and difficulty breathing.</li>
    <li><strong>Pneumonia</strong> — An infection of the lungs that causes inflammation and fluid buildup in the alveoli, leading to fever, cough, and breathing difficulty.</li>
    <li><strong>Chronic Obstructive Pulmonary Disease (COPD)</strong> — A progressive lung disease that obstructs airflow and makes breathing difficult, commonly caused by smoking.</li>
    <li><strong>Tuberculosis (TB)</strong> — A bacterial infection caused by Mycobacterium tuberculosis that mainly affects the lungs and may cause chronic cough, chest pain, and weight loss.</li>
    <li><strong>Lung Cancer</strong> — A malignant growth in the lung tissues often linked to smoking or exposure to harmful chemicals, causing coughing, chest pain, and breathing problems.</li>
  </ul>
</div>`,
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
        fn: "Control center of the body",
        desc: "Control center of the body that processes information, regulates body functions, and coordinates thoughts, emotions, and movement.",
      },
      {
        name: "Spinal Cord",
        icon: "<i class='fa-solid fa-signal'></i>",
        fn: "Neural signal transmission",
        desc: "Long bundle of nervous tissue that connects the brain to the rest of the body and transmits nerve signals.",
      },
      {
        name: "Nerves",
        icon: "<i class='fa-solid fa-network-wired'></i>",
        fn: "Sensory & motor information",
        desc: "Bundles of nerve fibers that carry sensory and motor information between the brain, spinal cord, and body parts.",
      },
      {
        name: "Neurons",
        icon: "<i class='fa-solid fa-bolt'></i>",
        fn: "Electrochemical signal cells",
        desc: "Specialized nerve cells that transmit electrical impulses throughout the nervous system.",
      },
      {
        name: "Sense Organs",
        icon: "<i class='fa-solid fa-eye'></i>",
        fn: "Sensory detection structures",
        desc: "Structures such as the eyes, ears, nose, tongue, and skin that detect stimuli and send sensory information to the brain.",
      },
    ],
    stats: [
      { val: "86 billion", lbl: "Brain neurons" },
      { val: "120 m/s", lbl: "Max signal speed" },
      { val: "20%", lbl: "Body energy used by brain" },
      { val: "100 trillion", lbl: "Synaptic connections" },
    ],
    fact: "<strong>Clinical insight:</strong> The brain has ~100 trillion synaptic connections. Alzheimer disease progressively destroys these connections, beginning in the hippocampus (memory) and spreading to the cortex, affecting ~50 million people worldwide and representing the most common cause of dementia.",
    example: `<div style="line-height:1.6;">
  <ul style="margin:6px 0 4px 0; padding-left:18px;">
    <li><strong>Alzheimer's Disease</strong> — A progressive neurodegenerative disorder that causes memory loss, confusion, and decline in cognitive function.</li>
    <li><strong>Parkinson's Disease</strong> — A disorder affecting movement due to the loss of dopamine-producing neurons, causing tremors, stiffness, and slowed movement.</li>
    <li><strong>Epilepsy</strong> — A neurological disorder characterized by recurrent seizures caused by abnormal electrical activity in the brain.</li>
    <li><strong>Stroke</strong> — A condition caused by interrupted blood flow to the brain, leading to brain damage and loss of body functions.</li>
    <li><strong>Meningitis</strong> — Inflammation of the protective membranes covering the brain and spinal cord, usually caused by bacterial or viral infections.</li>
  </ul>
</div>`,
    overlayParts: ["brain", "spine_nerves"],
  },
};

const SYSTEM_ORDER = [
  "integumentary",
  "skeletal",
  "muscular",
  "nervous",
  "endocrine",
  "cardiovascular",
  "respiratory",
  "digestive",
  "urinary",
  "lymphatic",
  "reproductive",
];

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
    0, 1.82, 0, 0, 0, 0, 1.02, 1.08, 0.96,
  ),
  skinShell(
    new THREE.SphereGeometry(0.5, 32, 32),
    0, 0.7, 0, 0, 0, 0, 1.18, 1.18, 0.82,
  ),
  skinShell(
    new THREE.SphereGeometry(0.4, 32, 32),
    0, 0.14, 0, 0, 0, 0, 1.02, 0.9, 0.76,
  ),
  skinShell(
    new THREE.SphereGeometry(0.46, 32, 32),
    0, -0.22, 0, 0, 0, 0, 1.14, 0.82, 0.76,
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
  SYSTEM_ORDER.forEach((key) => {
    const sys = SYSTEMS[key];
    if (!sys) return;
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

// If an example HTML string contains both <strong>Male:</strong>
// and <strong>Female:</strong> sections, extract only the section
// matching the active gender. If the example is already an object
// keyed by gender, return that entry.
function extractGenderExample(exampleHtml, gender) {
  if (!exampleHtml) return "";
  if (typeof exampleHtml === "object") return exampleHtml[gender] || "";
  // Normalize and find markers
  const maleTag = /<strong>\s*Male:\s*<\/strong>/i;
  const femaleTag = /<strong>\s*Female:\s*<\/strong>/i;
  const hasMale = maleTag.test(exampleHtml);
  const hasFemale = femaleTag.test(exampleHtml);
  if (!hasMale && !hasFemale) return exampleHtml;

  // Split out the sections by locating the tags and slicing
  const parts = [];
  let rest = exampleHtml;
  // Replace both markers with a unified token to split
  rest = rest.replace(maleTag, "<!--__MALE__-->");
  rest = rest.replace(femaleTag, "<!--__FEMALE__-->");
  const tokens = rest.split(/<!--__MALE__-->|<!--__FEMALE__-->/);
  // tokens array may include leading/trailing pieces; locate which token corresponds
  // to which marker by searching original positions
  const maleIndex = rest.indexOf("<!--__MALE__-->");
  const femaleIndex = rest.indexOf("<!--__FEMALE__-->");
  // Build map of sections
  const sectionMap = {};
  if (maleIndex !== -1 && femaleIndex !== -1) {
    // Determine order
    if (maleIndex < femaleIndex) {
      // tokens: [before, maleContent, between, femaleContent, after] or similar
      // find content between the markers
      const afterMale = rest.slice(maleIndex + "<!--__MALE__-->".length, femaleIndex);
      sectionMap.male = afterMale.trim();
      const afterFemale = rest.slice(femaleIndex + "<!--__FEMALE__-->".length);
      sectionMap.female = afterFemale.trim();
    } else {
      const afterFemale = rest.slice(femaleIndex + "<!--__FEMALE__-->".length, maleIndex);
      sectionMap.female = afterFemale.trim();
      const afterMale = rest.slice(maleIndex + "<!--__MALE__-->".length);
      sectionMap.male = afterMale.trim();
    }
  } else if (maleIndex !== -1) {
    sectionMap.male = rest.slice(maleIndex + "<!--__MALE__-->".length).trim();
  } else if (femaleIndex !== -1) {
    sectionMap.female = rest.slice(femaleIndex + "<!--__FEMALE__-->".length).trim();
  }

  return sectionMap[gender] || "";
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

  // Build the Example Conditions section only if the system has an `example` field
  const exampleHTML = sys.example
    ? `
            <div class="info-section">
              <div class="info-section-title">Example Conditions &amp; Disorders</div>
              <div class="fun-fact conditions-block">${extractGenderExample(
                sys.example,
                activeGender,
              )}</div>
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
            ${exampleHTML}
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
  // Delegate to the single gender-switch handler so both the
  // Sketchfab controls and the info-panel tabs stay in sync.
  switchGender(g);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebar-toggle");
  const collapsed = sidebar.classList.toggle("collapsed");
  toggle.classList.toggle("active", collapsed);
  const icon = toggle.querySelector("i");
  if (collapsed) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
}

function showWelcomeModal() {
  const modal = document.getElementById("welcome-modal");
  if (modal) modal.classList.add("show");
}

function closeWelcomeModal() {
  const modal = document.getElementById("welcome-modal");
  if (modal) modal.classList.remove("show");
}

buildSidebar();
showWelcomeModal();