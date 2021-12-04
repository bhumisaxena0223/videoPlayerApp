<template>
  <div class="container mt-3">
    <div class="alert alert-secondary" v-if="alertMessage" role="alert">
      {{ alertMessage }}
    </div>
    <div class="alert alert-success" v-if="alertMessagesuccess" role="alert">
      {{ alertMessagesuccess }}
    </div>
    <div class="card">
      <h5 class="card-header">Upload a video</h5>
      <div class="card-body">
        <div class="container input-group">
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input border p-1"
              id="input"
              @change="uploadFile"
            />
          </div>
          <div class="input-group-append">
            <button
              type="submit"
              class="btn btn-outline-primary"
              @click="handleSubmit()"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <h5 class="card-header">Video List</h5>
      <div class="container">
        <div class="row">
          <div class="col-sm-4" v-for="item in videoList" :key="item.id">
            <div v-for="video in item.videoname" :key="video.id">
              <router-link :to="`/video/${item.id}`">
                <video width="320" height="200" controls>
                  <source
                    :src="`http://localhost:1337${video.url}`"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../helpers/api.json";

export default {
  name: "VideoList",
  mounted() {
    this.getVideoList();
  },
  data() {
    return {
      videoList: {},
      videos: [],
      files: [],
      alertMessage: "",
      alertMessagesuccess: "",
    };
  },
  methods: {
    getVideoList() {
      axios
        .get(url.url + "videos")
        .then(({ data: resp }) => {
          this.videoList = resp;
        })
        .catch(() => {});
    },
    uploadFile(event) {
      const files = event.target.files[0];
      console.log(files, "files upload");
      this.files = files;
    },
    handleSubmit() {
      if (this.files.length == 0) {
        this.alertMessage =
          "Please select a file to upload from your computer.";
      } else {
        const data = new FormData();
        data.append("files", this.files);
        axios.post(`${url.url}upload/`, data).then((data) => {
          let response = data;
          // /videos Publish into collection
          axios
            .post(`${url.url}videos`, { videoname: response.data })
            .then((data) => {
              console.log({ data });
              if (data.status == 200) {
                this.alertMessagesuccess = "File uploaded successfully.";
              }
              this.getVideoList();
            });
          this.alertMessage = "";
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
video::-webkit-media-controls-fullscreen-button, video::-webkit-media-controls-play-button, video::-webkit-media-controls-pausebutton, video::-webkit-media-controls-volume-button {
    display: none;
}
</style>
