<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonActionSheet,
  ActionSheetButton,
} from "@ionic/vue";

const actionSheetButtons: ActionSheetButton[] = [
  {
    text: "Yes",
    data: {
      value: true,
    },
  },
  {
    text: "No",
    data: {
      value: false,
    },
  },
];

const test = (event: CustomEvent) => {
  console.log(event.detail.data);
};
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="grid place-items-center h-screen bg-slate-100">
        <ion-button id="open-action-sheet">Button</ion-button>
        <ion-action-sheet
          trigger="open-action-sheet"
          header="Do you want to continue?"
          :buttons="actionSheetButtons"
          @did-dismiss="test"
        />
      </div>
    </ion-content>
  </ion-page>
</template>
