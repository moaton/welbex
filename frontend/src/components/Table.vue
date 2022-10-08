<template>
  <div class="row pt-4">
    <div class="col-12 d-flex justify-content-end align-items-center mb-2">
      <b-button id="show-btn" variant="primary" @click="$bvModal.show('add-modal'), isSaved = false">Добавить данные</b-button>

      <b-modal id="add-modal" hide-footer>
        <template #modal-title>
          Добавить данные
        </template>
        <div class="form">
          <div :class="!isSaved ? 'form-show' : 'form-hide'">
            <div class="form-group col">
              <label for="new-date">Дата</label>
              <input type="date" v-model="form.date" class="form-control" id="new-date">
            </div>
            <div class="form-group col">
              <label for="new-name">Название</label>
              <input type="text" v-model="form.name" class="form-control" id="new-name" placeholder="Название">
            </div>
            <div class="form-group col">
              <label for="new-quantity">Количество</label>
              <input type="number" v-model.number="form.quantity" class="form-control" id="new-quantity" placeholder="Количество">
            </div>
            <div class="form-group col">
              <label for="new-distance">Растояние</label>
              <input type="number" v-model.number="form.distance" class="form-control" id="new-distance" placeholder="Растояние">
            </div>
          </div>
          <div>
            <div v-if="isSaved" class="success-checkmark">
              <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <b-button class="mt-3 mr-3" variant="outline-danger" @click="$bvModal.hide('add-modal')">Закрыть</b-button>
          <b-button class="mt-3" variant="primary" @click="onSave()">Сохранить</b-button>
        </div>
      </b-modal>
    </div>
    <div class="col-12 d-flex">
      <div class="form-group col-4">
        <label for="column">Фильтрация по колонке</label>
        <input type="text" class="form-control" id="column" placeholder="Название колонки">
      </div>
      <div class="form-group col-4">
        <label for="condition">Условие</label>
        <input type="text" class="form-control" id="condition" placeholder="Выберите условие">
      </div>
      <div class="form-group col-4">
        <label for="search">Поиск</label>
        <input type="text" class="form-control" id="search" placeholder="Найти...">
      </div>
    </div>
    <div class="col">
      <table class="table">
        <th>Дата</th>
        <th>Название</th>
        <th>Количество</th>
        <th>Расстояние</th>
        <th>Действия</th>
        <tr v-for="item in items" :key="item.id">
          <td>{{new Date(item.date).toLocaleString()}}</td>
          <td>{{item.name}}</td>
          <td>{{item.quantity}}</td>
          <td>{{item.distance}}м</td>
          <td>
            <div style="font-size: 2rem;">
              <b-icon icon="pencil-square" class="rounded-circle bg-info p-2 mr-3 edit" variant="light" style="cursor:pointer;"></b-icon>
              <b-icon icon="trash" class="rounded-circle bg-danger p-2 delete" variant="light" style="cursor:pointer;" @click="$bvModal.show(`delete-modal-${item.id}`)"></b-icon>
              <b-modal :id="`delete-modal-${item.id}`" hide-footer>
                <template #modal-title>
                  Удалить {{item.name}}? 
                </template>
                <div class="d-flex justify-content-end align-items-center">
                  <b-button class="mt-3 mr-3" variant="outline-secondary" @click="$bvModal.hide(`delete-modal-${item.id}`)">Закрыть</b-button>
                  <b-button class="mt-3" variant="danger" @click="onDelete(item.id)">Удалить</b-button>
                </div>
              </b-modal>
            </div>
          </td>
        </tr>
        <tr v-if="items.length === 0">
          <td colspan="4">
            <div class="text-center">Нет данных</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import '../assets/css/SweetAlert.scss'
export default {
  components: {
    
  },
  data() {
    return {
      form: {
        date: new Date(),
        name: '',
        quantity: 0,
        distance: 0,
      },
      isSaved: false,
    }
  },
  computed: {
    items(){
      return this.$store.state.items
    }
  },
  methods: {
    async onDelete(id){
      this.$store.dispatch('onDelete', id).then(() => {
        
        setTimeout(() => {
          this.$bvModal.hide(`delete-modal-${id}`)
        }, 500)
        setTimeout(() => {
          this.$store.dispatch('getData', id)
        }, 700)
      })
    },
    async onSave(){
      this.$store.dispatch('addItem', this.form).then(() => {
        this.$store.dispatch('getData')
        this.isSaved = !this.isSaved
        setTimeout(() => {
          this.$bvModal.hide('add-modal')
          this.form = {
            date: new Date(),
            name: '',
            quantity: 0,
            distane: 0,
          }
        }, 1500)
      })
    }
  },
}
</script>

<style lang="scss">
.form{
  position: relative;
  overflow: hidden;
  transition: all .5s ease;
  &>div{
    overflow: hidden;
    transition: all .5s ease;
  }
  .form-show{
    height: 330px;
  }
  .form-hide{
    height: 0;
  }
}
.edit, .delete{
  transition: all .5s ease;
}
.edit:hover, .delete:hover{
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 25%) !important;
}
</style>