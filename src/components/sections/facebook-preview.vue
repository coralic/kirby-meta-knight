<template>
  <div>
    <div class="k-field-label">
      <span class="facebook-icon"></span> {{ headline }}
    </div>
    <div class="open-graph-preview">
      <div class="open-graph-preview__image-container">
        <img
          v-if="this.storeImage.length || this.fallbackImage"
          :src="ogImage"
          class="open-graph-preview__preview-image"
        />
      </div>
      <div class="open-graph-preview__content-container">
        <span class="open-graph-preview__url">{{ ogSiteName }}</span>
        <h2 class="open-graph-preview__preview-headline" v-text="ogTitle"></h2>
        <p class="open-graph-preview__preview-paragraph">
          {{ ogDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headline: 'Facebook',
      url: null,
      ogTitle: null,
      ogImage: null,
      fallbackDescription: null,
      fallbackImage: null,
      fallbackSiteName: null
    }
  },
  methods: {
    async handleLoad(changes) {
      let newChanges = {}
      Object.entries(changes ?? this.changes).map(([key, value]) => {
        newChanges[key] = encodeURIComponent(value)
      })

      const response = await this.$api.get(
        this.parent + '/sections/' + this.name,
        newChanges
      )

      this.headline = response.headline
      this.ogTitle = response.title

      this.fallbackDescription = response.fallbackDescription
      this.fallbackSiteName = response.fallbackSiteName
      this.fallbackImage = response.fallbackImage
      if (!this.ogImage) {
        this.ogImage = response.fallbackImage
      }

      this.url = response.url
    }
  },
  created() {
    this.handleLoad()
  },
  computed: {
    changes() {
      return this.$store.getters['content/changes']()
    },
    ogDescription() {
      let ogDescription =
        this.$store.getters['content/values']().ogdescription

      if (!ogDescription) {
        ogDescription = this.$store.getters['content/values']().metadescription
      }

      return ogDescription === '' ? this.fallbackDescription : ogDescription
    },
    ogSiteName() {
      let ogSiteName = this.$store.getters['content/values']().ogsitename

      return ogSiteName === '' ? this.fallbackSiteName : ogSiteName
    },
    storeImage() {
      return this.$store.getters['content/values']().ogimage
    }
  },
  watch: {
    storeImage: {
      handler() {
        if (this.storeImage.length === 0) {
          this.ogImage = this.fallbackImage
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
              this.ogImage = response.url
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
.open-graph-preview {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 438px;
  background: #fff;
  border: 1px solid #ccc;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  &__image-container {
    position: relative;
    width: 100%;
    padding-bottom: 52.25%;

    &:before {
      content: '';
      color: #ddd;
      position: absolute;
      font-size: 2em;
      top: 50%;
      left: 50%;
      width: 100%;
      text-align: center;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  &__preview-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content-container {
    padding: 0.25em 0.75em 0.5em;
    background: #f2f3f5;
    border-top: 1px solid #dddfe2;
  }

  &__url {
    font-size: 0.625em;
    text-transform: uppercase;
    color: #5e6771;
  }

  &__preview-headline {
    margin: 0 0 0.25em 0;
    padding: 0;
    font-size: 1em;
    color: #1c212a;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__preview-paragraph {
    margin: 0;
    padding: 0;
    font-size: 0.75em;
    color: #5e6771;
  }
}

.facebook-icon {
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  transform: translateY(0.25em);
  line-height: 2;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMjQgNjRDMTI0IDMwLjg2NTQgOTcuMTM0NiA0IDY0IDRDMzAuODY1NCA0IDQgMzAuODY1NCA0IDY0QzQgOTMuOTQ1MSAyNS45Mzc4IDExOC43NjkgNTQuNjI1OCAxMjMuMjc0VjgxLjM0NzhIMzkuMzg3NFY2NEg1NC42MjU4VjUwLjc3ODJDNTQuNjI1OCAzNS43NDI0IDYzLjU4NjYgMjcuNDMxMyA3Ny4yODkzIDI3LjQzMTNDODMuODUzNyAyNy40MzEzIDkwLjcyMiAyOC42MDQxIDkwLjcyMiAyOC42MDQxVjQzLjM3SDgzLjE1MzRDNzUuNzAzIDQzLjM3IDczLjM3NDIgNDcuOTkzOCA3My4zNzQyIDUyLjc0NDJWNjRIOTAuMDEzMkw4Ny4zNTU0IDgxLjM0NzhINzMuMzc0MlYxMjMuMjc0QzEwMi4wNjIgMTE4Ljc3NyAxMjQgOTMuOTUzNiAxMjQgNjRaIiBmaWxsPSIjMTk3N0YzIi8+CjxwYXRoIGQ9Ik04Ny4zNTUzIDgxLjM0NzhMOTAuMDEzMiA2NEg3My4zNzQyVjUyLjc0NDJDNzMuMzc0MiA0OC4wMDIzIDc1LjY5NDUgNDMuMzcgODMuMTUzNCA0My4zN0g5MC43MjJWMjguNjA0MUM5MC43MjIgMjguNjA0MSA4My44NTM3IDI3LjQzMTMgNzcuMjg5MyAyNy40MzEzQzYzLjU4NjUgMjcuNDMxMyA1NC42MjU4IDM1LjczMzkgNTQuNjI1OCA1MC43NzgyVjY0SDM5LjM4NzRWODEuMzQ3OEg1NC42MjU4VjEyMy4yNzRDNTcuNjgwMiAxMjMuNzU1IDYwLjgxMDYgMTI0IDY0IDEyNEM2Ny4xODk0IDEyNCA3MC4zMTk4IDEyMy43NDcgNzMuMzc0MiAxMjMuMjc0VjgxLjM0NzhIODcuMzU1M1oiIGZpbGw9IiNGRUZFRkUiLz4KPC9zdmc+Cg==');
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
