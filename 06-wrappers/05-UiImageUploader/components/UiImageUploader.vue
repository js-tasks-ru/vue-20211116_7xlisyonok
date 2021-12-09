<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === 'uploading' }"
      :style="{ '--bg-url': backgroundUrl }"
      @click="handleClick"
    >
      <span v-if="state === 'empty'" class="image-uploader__text">Загрузить изображение</span>
      <span v-else-if="state === 'preview'" class="image-uploader__text">Удалить изображение</span>
      <span v-else-if="state === 'uploading'" class="image-uploader__text">Загрузка...</span>

      <input
        ref="input"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="handleChangeFile"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },

  emits: ['select', 'remove', 'upload', 'error'],

  data() {
    return {
      previewUrl: this.preview,
      // 'empty' = no preview image
      // 'uploading'
      // 'preview'
      state: this.preview ? 'preview' : 'empty',
    };
  },

  computed: {
    backgroundUrl() {
      if (this.state !== 'preview') return;
      return this.previewUrl && `url('${this.previewUrl}')`;
    },
  },

  methods: {
    handleClick($event) {
      if (this.state === 'preview') {
        $event.preventDefault();
        this.remove();
        this.$emit('remove');
      }

      if (this.state === 'uploading') {
        $event.preventDefault();
      }
    },

    handleChangeFile($event) {
      const file = $event.target.files[0];
      this.$emit('select', file);

      if (this.uploader) {
        this.upload(file);
      } else {
        this.createPreview(file);
      }
    },

    upload(file) {
      this.state = 'uploading';
      this.uploader(file).then(this.uploadSuccess, this.uploadError);
    },

    uploadSuccess(result) {
      this.previewUrl = result.image;
      this.state = 'preview';
      this.$emit('upload', result);
    },

    uploadError(error) {
      this.remove();
      this.$emit('error', error);
    },

    createPreview(file) {
      const Url = URL.createObjectURL(file);
      this.previewUrl = Url;
      this.state = 'preview';
    },

    remove() {
      this.state = 'empty';
      this.previewUrl = null;
      this.$refs.input.value = null;
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
