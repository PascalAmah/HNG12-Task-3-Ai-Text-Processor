const apiService = {
  detector: null,
  translator: null,
  summarizer: null,

  async initializeServices(sourceLang = "en", targetLang = "fr") {
    try {
      this.detector = await this.initializeDetector();
      this.translator = await this.initializeTranslator(sourceLang, targetLang);
      // this.summarizer = await this.initializeSummarizer();
    } catch (error) {
      console.error("Service initialization failed:", error);
      throw error;
    }
  },

  async initializeDetector() {
    try {
      if (!("ai" in self && "languageDetector" in self.ai)) {
        console.error("Language Detector API is not available");
        return null;
      }

      const languageDetectorCapabilities =
        await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;

      if (canDetect === "no") {
        console.error("The language detector isn't usable.");
        return null;
      }

      let detector;
      if (canDetect === "readily") {
        console.log("The language detector can immediately be used.");
        detector = await self.ai.languageDetector.create();
      } else {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) =>
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
            );
          },
        });
        await detector.ready;
      }

      return detector;
    } catch (error) {
      console.error("Detector initialization failed:", error);
      return null;
    }
  },

  async detectLanguage(text) {
    try {
      if (!this.detector) {
        throw new Error("Language detector is not initialized");
      }

      const results = await this.detector.detect(text);

      if (!results || !Array.isArray(results) || results.length === 0) {
        throw new Error("Invalid detection result");
      }

      const topResult = results[0];

      if (!topResult || typeof topResult.detectedLanguage !== "string") {
        throw new Error("Invalid detection result format");
      }

      return [{ language: topResult.detectedLanguage }];
    } catch (error) {
      console.error("Language detection failed:", error);
      throw error;
    }
  },

  async initializeTranslator(sourceLang, targetLang) {
    try {
      if (!("ai" in self && "translator" in self.ai)) {
        throw new Error("Translator API is not supported");
      }

      console.log("The Translator API is supported.");
      const translatorCapabilities = await self.ai.translator.capabilities();
      const result = translatorCapabilities.languagePairAvailable(
        sourceLang,
        targetLang
      );

      if (result === "no") {
        throw new Error(
          `Translation not available for ${sourceLang} to ${targetLang}`
        );
      }

      if (result === "readily" || result === "after-download") {
        const translator = await self.ai.translator.create({
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });

        if (result === "after-download") {
          await translator.ready;
        }

        return translator;
      }

      throw new Error("Unexpected translator capability result");
    } catch (error) {
      console.error("Translator initialization failed:", error);
      throw error;
    }
  },

  async translateText(text) {
    try {
      if (!this.translator) {
        throw new Error("Translator is not initialized");
      }

      const translation = await this.translator.translate(text);

      if (!translation || typeof translation !== "string") {
        throw new Error("Invalid translation result");
      }

      return translation;
    } catch (error) {
      console.error("Translation failed:", error);
      throw error;
    }
  },

  // async initializeSummarizer() {
  //   try {
  //     const available = (await self.ai.summarizer.capabilities()).available;
  //     if (available === "no") {
  //       console.error("Summarizer API is not available.");
  //       return null;
  //     }

  //     const options = {
  //       sharedContext: "Scientific or technical content",
  //       type: "key-points",
  //       format: "markdown",
  //       length: "medium",
  //     };

  //     let summarizer = await self.ai.summarizer.create(options);
  //     if (available !== "readily") {
  //       summarizer.addEventListener("downloadprogress", (e) =>
  //         console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
  //       );
  //       await summarizer.ready;
  //     }
  //     return summarizer;
  //   } catch (error) {
  //     console.error("Error initializing summarizer:", error);
  //     return null;
  //   }
  // },

  // async summarizeText(text) {
  //   if (!this.summarizer) {
  //     console.error("Summarizer is not initialized.");
  //     return "";
  //   }
  //   try {
  //     return await this.summarizer.summarize(text, {
  //       context: "For a tech-savvy audience.",
  //     });
  //   } catch (error) {
  //     console.error("Summarization error:", error);
  //     return "";
  //   }
  // },
};

export default apiService;
