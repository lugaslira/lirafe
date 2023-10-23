<template>
    <div>
        <li>
            <!-- jika parent -->
            <a @click="openChild()" v-if="hasChild" class="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                <IconVue :iconType="modul.icon"></IconVue>
                <span class="flex-1 ml-3 whitespace-nowrap">{{ modul.name }}</span>
                <IconVue iconType="bottom" v-if="hasChild"></IconVue>
            </a>
            <!-- jika child -->
            <a :href="modul.url" v-else class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                <IconVue :iconType="modul.icon"></IconVue>
                <span class="flex-1 ml-3 whitespace-nowrap">{{ modul.name }}</span>
                <IconVue iconType="bottom" v-if="hasChild"></IconVue>
            </a>
        </li>
        <div v-if="hasChild" v-for="child in getChild">
            <ChildModul :modul="child"></ChildModul>
        </div>
    </div>
</template>

<script>
import ChildModul from './ChildModul.vue';
import IconVue from './IconVue.vue';
import { getModulByParentId_static } from '../../../services/modul.mjs'

export default {
  props: {
    modul: Object,
  },
  computed: {
    hasChild(){
        return getModulByParentId_static(this.modul.id).length > 0;
    },
    getChild(){
        return getModulByParentId_static(this.modul.id);
    }
  },
  methods: {
    openChild() {
      console.log('okay')
    },
  },
  components: {
    IconVue,
    ChildModul
  }
};
</script>