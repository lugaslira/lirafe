<template>
    <div>
        <li @click="eventLinkChild()">
            <!-- jika parent -->
            <a v-if="hasChild" :class="{'bg-teal-600 text-white': checkStore}" class="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg dark:hover:bg-gray-700 dark:text-white group">
                <IconVue :iconType="modul.icon"></IconVue>
                <span class="flex-1 ml-3 whitespace-nowrap">{{ modul.name }}</span>
                <IconVue iconType="bottom" v-if="!checkStore"></IconVue>
                <IconVue iconType="minus" v-if="checkStore"></IconVue>
            </a>
            <!-- jika child -->
            <a :href="modul.url" v-else class="flex items-center p-2 text-gray-900 hover:text-white rounded-lg hover:bg-teal-500 dark:hover:bg-gray-700 dark:text-white group">
                <IconVue :iconType="modul.icon"></IconVue>
                <span class="flex-1 ml-3 whitespace-nowrap">{{ modul.name }}</span>
            </a>
        </li>
        <div v-if="checkStore" v-for="child in getChild">
            <ChildModul :modul="child"></ChildModul>
        </div>
    </div>
</template>

<script>
import IconVue from './IconVue.vue';
import { getModulByParentId_static } from '../../../services/modul.mjs'
import { $isOpenChild } from '../../../app/lib/sidebarStore';
import { useStore } from '@nanostores/vue';

export default {
  props: {
    modul: Object
  },
  data() {
    return {
      isOpenChild: new Map([])
    };
  },
  mounted() {
    this.isOpenChild = useStore($isOpenChild)
  },
  computed: {
    hasChild(){
      return getModulByParentId_static(this.modul.id).length > 0;
    },
    getChild(){
      return getModulByParentId_static(this.modul.id);
    },
    checkStore(){
      if(this.isOpenChild[this.modul.id] == 'undefined'){
        return false;
      }else{
        return this.isOpenChild[this.modul.id];
      }
    }
  },
  methods: {
    eventLinkChild() {
      $isOpenChild.setKey(this.modul.id, !this.checkStore);
    }
  },
  components: {
    IconVue
  }
};
</script>