<template>
  <div>
    <div class="k-field-label">
      <span class="twitter-icon"></span> {{ headline }}
    </div>
    <div class="twitter-cards">
      <template v-if="twitterCardType === 'summary_large_image'">
        <div class="twitter-card twitter-card--horizontal">
          <div class="twitter-card__image">
            <img
              v-if="this.storeImage.length || this.fallbackImage"
              :src="twitterImage"
              class="twitter-card__preview-image"
            />
          </div>

          <div class="twitter-card__content-container">
            <h2 class="twitter-card__preview-headline">{{ twitterTitle }}</h2>
            <p class="twitter-card__preview-paragraph">
              {{ twitterDescription }}
            </p>
            <span class="twitter-card__url">{{ twitterUrl }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="twitter-card">
          <div class="twitter-card__image">
            <img
              v-if="this.storeImage.length || this.fallbackImage"
              :src="twitterImage"
              class="twitter-card__preview-image"
            />
          </div>

          <div class="twitter-card__content-container">
            <h2 class="twitter-card__preview-headline">{{ twitterTitle }}</h2>
            <p class="twitter-card__preview-paragraph">
              {{ twitterDescription }}
            </p>
            <span class="twitter-card__url">{{ twitterUrl }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headline: 'Twitter Card',
      twitterTitle: null,
      twitterImage: null,
      fallbackDescription: null,
      fallbackImage: null,
      url: null
    }
  },
  created() {
    this.handleLoad()
  },
  methods: {
    async handleLoad(changes) {
      let newChanges = {}
      Object.entries(changes ?? this.changes).map(([key, value]) => {
        newChanges[key] = encodeURIComponent(value);
      })

      const response = await this.$api.get(this.parent + '/sections/' + this.name, newChanges)
        
      this.headline = response.headline
      this.twitterTitle = response.title

      this.fallbackDescription = response.fallbackDescription
      this.fallbackImage = response.fallbackImage
      if(!this.twitterImage) {
        this.twitterImage = response.fallbackImage
      }
      
      this.url = response.url
    }
  },
  computed: {
    changes() {
      return this.$store.getters['content/changes']()
    },
    twitterCardType() {
      let twitterCardType =
        this.$store.getters['content/values']().twittercardtype

      return twitterCardType
    },
    twitterDescription() {
      let twitterDescription = this.$store.getters["content/values"]()
        .twitterdescription
      
      if(!twitterDescription) {
        twitterDescription = this.$store.getters["content/values"]()
          .metadescription
      }
      
      return twitterDescription === '' ? this.fallbackDescription : twitterDescription
    },
    storeImage() {
      return this.$store.getters['content/values']().twitterimage
    }
  },
  watch: {
    storeImage: {
      handler() {
        if (this.storeImage.length === 0) {
          this.twitterImage = this.fallbackImage
        } else {
          this.$api.files
            .get(
              this.$store.getters['content/model']().api,
              this.storeImage[0].filename,
              {
                view: 'compact'
              }
            )
            .then((response) => {
              this.twitterImage = response.url
            })
        }
      },
      immediate: true
    },
    changes(changes) {
      this.handleLoad(changes)
    }
  }
}
</script>

<style lang="scss">
.twitter-card {
  display: flex;
  width: 100%;
  margin-bottom: 1em;
  max-width: 438px;
  background: #fff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.3em;
  border: 1px solid #ccc;
  border-radius: 0.85714em;
  overflow: hidden;

  &--horizontal {
    flex-direction: column;
    max-width: 507px;
  }

  &--horizontal &__image {
    width: 100%;
    padding-bottom: 52.25%;
    border-bottom: 1px solid #e1e8ed;
    border-right: none;
  }

  &__image {
    position: relative;
    width: 25%;
    padding-bottom: 25%;
    border-right: 1px solid #e1e8ed;
  }

  &__image:before {
    content: 'Image Missing';
    color: #ddd;
    position: absolute;
    font-size: 1em;
    top: 50%;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translateX(-50%) translateY(-50%);
  }

  &--horizontal &__image:before {
    font-size: 2em;
  }

  &__preview-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content-container {
    padding: 1em;
    width: 75%;
  }

  &__preview-headline {
    margin-top: 0;
    margin-bottom: 0.33em;
    font-size: 1em;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__preview-paragraph {
    margin: 0;
    font-size: 0.875em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__url {
    display: block;
    margin-top: 0.33em;
    margin-bottom: 0;
    padding: 0;
    font-size: 0.875em;
    color: #8899a6;
  }
}

.twitter-icon {
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  transform: translateY(0.25em);
  line-height: 2;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMTkuNDg3IDQxLjA3NjNDMTIyLjUwMiA0OC4zNDkgMTI0IDU2LjAwNTUgMTI0IDY0LjAwOTFDMTI0IDcyLjAxMjggMTIyLjQ4MyA3OS42NjkzIDExOS40ODcgODYuOTQyQzExNi40NzEgOTQuMjE0NyAxMTIuMTIyIDEwMC43MiAxMDYuNDIxIDEwNi40MjFDMTAwLjcyIDExMi4xMjIgOTQuMjMzIDExNi40OSA4Ni45NDIgMTE5LjQ4N0M3OS42NTEgMTIyLjUwMiA3Mi4wMTI4IDEyNCA2NC4wMDkxIDEyNEM1Ni4wMDU1IDEyNCA0OC4zNDkgMTIyLjQ4MyA0MS4wNzYzIDExOS40ODdDMzMuODAzNiAxMTYuNDcxIDI3LjI5ODMgMTEyLjEyMiAyMS41OTcxIDEwNi40MjFDMTUuODk1OCAxMDAuNzIgMTEuNTI4NiA5NC4yMzMgOC41MTM0OCA4Ni45NDJDNS41MTY2NyA3OS42NjkzIDQgNzIuMDEyOCA0IDY0LjAwOTFDNCA1Ni4wMDU1IDUuNDk4NCA0OC4zNDkgOC41MTM0OCA0MS4wNzYzQzExLjUyODYgMzMuODAzNiAxNS44Nzc2IDI3LjI5ODMgMjEuNTk3MSAyMS41OTcxQzI3LjMxNjYgMTUuODk1OCAzMy43ODUzIDExLjUyODYgNDEuMDc2MyA4LjUxMzQ4QzQ4LjM0OSA1LjQ5ODQgNTYuMDA1NSA0IDY0LjAwOTEgNEM3Mi4wMTI4IDQgNzkuNjY5MyA1LjUxNjY3IDg2Ljk0MiA4LjUxMzQ4Qzk0LjIxNDcgMTEuNTI4NiAxMDAuNzIgMTUuODc3NiAxMDYuNDIxIDIxLjU5NzFDMTEyLjEyMiAyNy4yOTgzIDExNi40OSAzMy43ODUzIDExOS40ODcgNDEuMDc2M1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01Mi4zNjQgOTMuNzYyNUM4MC4xMDQyIDkzLjc2MjUgOTUuMjczMiA3MS42MzMgOTUuMjczMiA1Mi40NDM5Qzk1LjI3MzIgNTEuODE1MyA5NS4yNTk5IDUxLjE4OTYgOTUuMjMwNiA1MC41NjY3Qzk4LjE3NTMgNDguNTE2OSAxMDAuNzM1IDQ1Ljk1ODggMTAyLjc1MyA0My4wNDY4QzEwMC4wNTEgNDQuMjAzNCA5Ny4xNDMzIDQ0Ljk4MiA5NC4wOTI3IDQ1LjMzMzFDOTcuMjA2NSA0My41MzUyIDk5LjU5NjkgNDAuNjkxMSAxMDAuNzI1IDM3LjMwMDdDOTcuODEwNyAzOC45NjQgOTQuNTgzNyA0MC4xNzMgOTEuMTQ4IDQwLjgyNTZDODguMzk1OSAzOC4wMDI4IDg0LjQ3NzkgMzYuMjM3NSA4MC4xMzk1IDM2LjIzNzVDNzEuODExMiAzNi4yMzc1IDY1LjA1NzMgNDIuNzQxIDY1LjA1NzMgNTAuNzU3OEM2NS4wNTczIDUxLjg5NzQgNjUuMTg5NiA1My4wMDU5IDY1LjQ0ODMgNTQuMDY5QzUyLjkxMzkgNTMuNDYxNyA0MS43OTk1IDQ3LjY4MzEgMzQuMzYyMSAzOC44OTYxQzMzLjA2NjkgNDEuMDQyMiAzMi4zMiA0My41MzUyIDMyLjMyIDQ2LjE5NTJDMzIuMzIgNTEuMjMzNSAzNC45ODI1IDU1LjY4MTUgMzkuMDMxMyA1OC4yODM0QzM2LjU1NyA1OC4yMDk4IDM0LjIzMjcgNTcuNTU1OCAzMi4yMDEgNTYuNDY3MkMzMi4xOTg3IDU2LjUyODEgMzIuMTk4NyA1Ni41ODc1IDMyLjE5ODcgNTYuNjUyNkMzMi4xOTg3IDYzLjY4NTYgMzcuMzk3MiA2OS41NTc3IDQ0LjI5ODEgNzAuODg4NEM0My4wMzA4IDcxLjIyMTEgNDEuNjk3NCA3MS4zOTk0IDQwLjMyMTMgNzEuMzk5NEMzOS4zNTEgNzEuMzk5NCAzOC40MDU3IDcxLjMwNzUgMzcuNDg2OSA3MS4xMzc1QzM5LjQwNjkgNzYuOTA3NyA0NC45NzQzIDgxLjEwNjUgNTEuNTc1MyA4MS4yMjQxQzQ2LjQxMzYgODUuMTE5OSAzOS45MTExIDg3LjQ0MDIgMzIuODQ0MSA4Ny40NDAyQzMxLjYyODMgODcuNDQwMiAzMC40MjcyIDg3LjM3MzYgMjkuMjQ2NyA4Ny4yMzkxQzM1LjkyMTEgOTEuMzU4NyA0My44NDY3IDkzLjc2MjUgNTIuMzY0NyA5My43NjI1IiBmaWxsPSIjMURBMUYyIi8+Cjwvc3ZnPgo=');
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
