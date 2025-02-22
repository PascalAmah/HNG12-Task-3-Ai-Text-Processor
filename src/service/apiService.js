// const apiService = {
//   detector: null,
//   translator: null,
//   summarizer: null,

//   async initializeServices(sourceLang = "en", targetLang = "fr") {
//     this.detector = await this.initializeDetector();
//     this.translator = await this.initializeTranslator(sourceLang, targetLang);
//     this.summarizer = await this.initializeSummarizer();
//   },

//   // Language detector initialized
//   async initializeDetector() {
//     const capabilities = await self.ai.languageDetector.capabilities();
//     if (capabilities.capabilities === "no") {
//       console.error("Language detection not supported.");
//       return null;
//     }

//     let detector;
//     if (capabilities.capabilities === "readily") {
//       detector = await self.ai.languageDetector.create();
//     } else {
//       detector = await self.ai.languageDetector.create({
//         monitor(m) {
//           m.addEventListener("downloadprogress", (e) =>
//             console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
//           );
//         },
//       });
//       await detector.ready;
//     }
//     return detector;
//   },

//   async detectLanguage(text) {
//     if (!this.detector) {
//       console.error("Language detector is not initialized.");
//       return [];
//     }
//     return await this.detector.detect(text);
//   },

//   // Language translator initialized
//   async initializeTranslator(sourceLang, targetLang) {
//     const supportedLanguages = ["en", "pt", "es", "ru", "tr", "fr"];
//     if (
//       !supportedLanguages.includes(sourceLang) ||
//       !supportedLanguages.includes(targetLang)
//     ) {
//       console.error("Unsupported language selected.");
//       return null;
//     }

//     try {
//       const translator = await self.ai.translator.create({
//         sourceLanguage: sourceLang,
//         targetLanguage: targetLang,
//         monitor(m) {
//           m.addEventListener("downloadprogress", (e) =>
//             console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
//           );
//         },
//       });
//       return translator;
//     } catch (error) {
//       console.error("Error initializing translator:", error);
//       return null;
//     }
//   },

//   async translateText(text) {
//     if (!this.translator) {
//       console.error("Translator is not initialized.");
//       return "";
//     }
//     try {
//       return await this.translator.translate(text);
//     } catch (error) {
//       console.error("Translation error:", error);
//       return "";
//     }
//   },

//   // Text summarizer initialized
//   async initializeSummarizer() {
//     try {
//       const available = (await self.ai.summarizer.capabilities()).available;
//       if (available === "no") {
//         console.error("Summarizer API is not available.");
//         return null;
//       }

//       const options = {
//         sharedContext: "Scientific or technical content",
//         type: "key-points",
//         format: "markdown",
//         length: "medium",
//       };

//       let summarizer = await self.ai.summarizer.create(options);
//       if (available !== "readily") {
//         summarizer.addEventListener("downloadprogress", (e) =>
//           console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
//         );
//         await summarizer.ready;
//       }
//       return summarizer;
//     } catch (error) {
//       console.error("Error initializing summarizer:", error);
//       return null;
//     }
//   },

//   async summarizeText(text) {
//     if (!this.summarizer) {
//       console.error("Summarizer is not initialized.");
//       return "";
//     }
//     try {
//       return await this.summarizer.summarize(text, {
//         context: "For a tech-savvy audience.",
//       });
//     } catch (error) {
//       console.error("Summarization error:", error);
//       return "";
//     }
//   },
// };

// export default apiService;

// class ApiService {
//   constructor() {
//     this.detector = null;
//     this.translator = null;
//     this.summarizer = null;
//     this.initialized = false;
//   }

//   async initializeServices(sourceLang = "en", targetLang = "fr") {
//     try {
//       const [detector, translator, summarizer] = await Promise.all([
//         this.initializeDetector(),
//         this.initializeTranslator(sourceLang, targetLang),
//         // this.initializeSummarizer(),
//       ]);

//       if (!detector) {
//         throw new Error("Language detector initialization failed");
//       }

//       this.detector = detector;
//       this.translator = translator;
//       this.summarizer = summarizer;
//       this.initialized = true;

//       return true;
//     } catch (error) {
//       console.error("Service initialization failed:", error);
//       this.initialized = false;
//       throw error;
//     }
//   }

//   async initializeDetector() {
//     try {
//       const capabilities = await self.ai.languageDetector.capabilities();
//       if (capabilities.capabilities === "no") {
//         throw new Error("Language detection not supported");
//       }

//       let detector;
//       if (capabilities.capabilities === "readily") {
//         detector = await self.ai.languageDetector.create();
//       } else {
//         detector = await self.ai.languageDetector.create({
//           monitor(m) {
//             m.addEventListener("downloadprogress", (e) =>
//               console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
//             );
//           },
//         });
//         await detector.ready;
//       }
//       console.log("detector initialized");
//       return detector;
//     } catch (error) {
//       console.error("Detector initialization failed:", error);
//       return null;
//     }
//   }

//   async detectLanguage(text) {
//     try {
//       if (!this.detector) {
//         throw new Error("Language detector is not initialized");
//       }

//       const result = await this.detector.detect(text);

//       if (!result || !Array.isArray(result) || result.length === 0) {
//         throw new Error("Invalid detection result");
//       }

//       if (!result[0] || typeof result[0].language !== "string") {
//         throw new Error("Invalid detection result format");
//       }

//       return result;
//     } catch (error) {
//       console.error("Language detection failed:", error);
//       throw error;
//     }
//   }

//   async initializeTranslator(sourceLang, targetLang) {
//     const supportedLanguages = ["en", "pt", "es", "ru", "tr", "fr"];

//     try {
//       if (
//         !supportedLanguages.includes(sourceLang) ||
//         !supportedLanguages.includes(targetLang)
//       ) {
//         throw new Error(
//           `Unsupported language pair: ${sourceLang} -> ${targetLang}`
//         );
//       }

//       const translator = await self.ai.translator.create({
//         sourceLanguage: sourceLang,
//         targetLanguage: targetLang,
//         monitor(m) {
//           m.addEventListener("downloadprogress", (e) =>
//             console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
//           );
//         },
//       });
//       console.log("translator initialized");
//       return translator;
//     } catch (error) {
//       console.error("Translator initialization failed:", error);
//       throw error;
//     }
//   }

//   async translateText(text) {
//     try {
//       if (!this.translator) {
//         throw new Error("Translator is not initialized");
//       }

//       const translation = await this.translator.translate(text);

//       if (!translation || typeof translation !== "string") {
//         throw new Error("Invalid translation result");
//       }

//       return translation;
//     } catch (error) {
//       console.error("Translation failed:", error);
//       throw error;
//     }
//   }

//   // async initializeSummarizer() {
//   //   try {
//   //     const capabilities = await self.ai.summarizer.capabilities();
//   //     if (capabilities.available === "no") {
//   //       throw new Error("Summarizer API is not available");
//   //     }

//   //     const options = {
//   //       sharedContext: "Scientific or technical content",
//   //       type: "key-points",
//   //       format: "markdown",
//   //       length: "medium",
//   //     };

//   //     let summarizer = await self.ai.summarizer.create(options);
//   //     if (capabilities.available !== "readily") {
//   //       summarizer.addEventListener("downloadprogress", (e) =>
//   //         console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
//   //       );
//   //       await summarizer.ready;
//   //     }
//   //     return summarizer;
//   //   } catch (error) {
//   //     console.error("Summarizer initialization failed:", error);
//   //     throw error;
//   //   }
//   // }

//   // async summarizeText(text) {
//   //   try {
//   //     if (!this.summarizer) {
//   //       throw new Error("Summarizer is not initialized");
//   //     }

//   //     const summary = await this.summarizer.summarize(text, {
//   //       context: "For a tech-savvy audience.",
//   //     });

//   //     if (!summary || typeof summary !== "string") {
//   //       throw new Error("Invalid summary result");
//   //     }

//   //     return summary;
//   //   } catch (error) {
//   //     console.error("Summarization failed:", error);
//   //     throw error;
//   //   }
//   // }
// }

// export default new ApiService();

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
