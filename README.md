# 🥗 **Bite2Burn: AI-Powered Calorie Estimation & Personalized Nutrition Assistant**

> ⚙️ *Retrieval-Augmented Generation (RAG) over the Indian Food Composition Tables (IFCT 2017)*  
> 🧠 *Combining NLP, Information Retrieval, and Nutrition Science for culturally aware dietary guidance.*

---

### 📘 **Introduction**

While several global calorie-tracking tools exist, most fail to adapt to the diverse **Indian cuisine**, which involves complex preparation styles, ingredients, and regional variations.  
**Bite2Burn** addresses this gap by integrating **AI**, **Natural Language Processing (NLP)**, and **Knowledge Retrieval Systems** to enable accurate calorie estimation and meal planning based on the *Indian Food Composition Tables (IFCT)* developed by the **National Institute of Nutrition (ICMR)**.

This project blends **machine learning**, **data engineering**, and **human-computer interaction** to deliver a seamless, interactive chatbot experience — empowering users to make informed dietary decisions and achieve their health goals effectively.

---

### 🌍 **Domain Significance**

> 🧩 This project lies at the intersection of:

- 🍱 **Nutritional Informatics** — structuring and normalizing food composition knowledge  
- 🔍 **Information Retrieval** — dense vector similarity + multi-granularity indexing  
- 🧾 **Natural Language Generation** — LLM-driven summarization and answer synthesis  
- 🛠️ **Applied Data Engineering** — PDF parsing, OCR, table normalization  

**💡 Contribution:** Toward *precision nutrition*, *dietary decision support*, and *culturally aligned health AI.*

---

### 🧠 **Dataset Overview: Indian Food Composition Tables (IFCT 2017)**

> **Published by:** National Institute of Nutrition (ICMR)  
> **Scope:** 528 food items · 20 food groups · 150+ nutritional parameters  
> **Granularity:** Region-wise variations (North, South, East, West, Central, NE India)

| 🍚 **Attribute** | 📊 **Description** |
|------------------|-------------------|
| **Total Foods** | 528 |
| **Food Groups** | 20 |
| **Nutrients Analyzed** | >150 |
| **Units** | kJ per 100g edible portion |
| **Data Source** | National Institute of Nutrition (ICMR) |
| **Uniqueness** | Lab-analyzed values with cultural food prep details |

---

### ⚙️ **Methodology**

> The pipeline combines layout-aware document processing, semantic retrieval, and generative reasoning for food-level understanding.

| 🔹 **Stage** | 🧰 **Technique / Tool** | 🎯 **Purpose** |
|--------------|--------------------------|----------------|
| 🧾 **PDF Partitioning** | *Unstructured* + layout inference | Structured extraction of tables & titles |
| 🔤 **OCR (conditional)** | `Tesseract` | Convert embedded raster text |
| 🗂️ **Categorization** | Type inspection (`Table` vs `CompositeElement`) | Downstream semantic handling |
| 🧠 **Summarization** | `Mistral-7B-Instruct` *(instruction-tuned)* | Condense verbose tables for efficient embedding |
| 🔡 **Embeddings** | `FastEmbed` | Dense vector semantic search *(low-latency)* |
| 🔍 **Multi-Vector Retrieval** | `LangChain MultiVectorRetriever` | Link summary → raw table/text for rich context |
| 🧱 **Vector Store** | `ChromaDB` | Persistent similarity index |
| 💬 **Answer Generation** | `Mistral` / *(planned)* `Llama 3.1` | Natural language synthesis grounded in retrieved context |
| ⚖️ **Personalization Logic** | Derived caloric equations *(future extension)* | Tailored intake/expenditure guidance |

---
### 🧱 **Tech Stack**

| 🧩 **Layer** | ⚙️ **Technology / Library** | 🎯 **Purpose** |
|--------------|-----------------------------|----------------|
| 🧠 **LLMs** | `Mistral 7B`, `Llama 3.1` | Summarization & Question Answering |
| 🗃️ **Vector DB** | `ChromaDB` | Semantic similarity search & retrieval |
| 🔡 **Embedding** | `FastEmbed` | Text-to-vector encoding |
| 📄 **PDF Processing** | `Unstructured`, `YOLO` | Text & table extraction |
| 🎨 **Frontend** | `React`, `Tailwind CSS` | Interactive UI/UX |
| ⚙️ **Backend** | `Flask` | RESTful API services |
| 📊 **Visualization** | `Recharts` | Nutrient charts & data plots |
| 🌐 **Communication** | `Axios` | HTTP request handling between client and server |

---

### ⚔️ **Key Challenges & Resolutions**

| ⚠️ **Challenge** | 💥 **Impact** | 🧩 **Resolution / Strategy** |
|------------------|---------------|------------------------------|
| **Table boundary detection variability** | Fragmented or misaligned rows | Utilized layout model + `infer_table_structure=True` |
| **Memory pressure while loading 7B model** | OOM (Out-of-Memory) risk | Adopted `torch.float16`, gradient checkpointing, and reduced `max_new_tokens` |
| **Noisy cell annotations (+/- symbols)** | Embedding distortion | Applied regex sanitation before vectorization |
| **Retrieval of large raw tables** | High latency | Used summary-based embeddings + parent-doc mapping via `MultiVectorRetriever` |
| **Heterogeneous regional columns** | Ambiguous data alignment | Preserved original schema and deferred normalization to post-processing |

---

💡 *Outputs are informational and not medical advice.*

