<template>
  <div class="pt-4 pb-4">
    <div class="col-12 d-flex justify-content-end align-items-center mb-2">
      <b-button id="show-btn" variant="primary" @click="onAddItem()">Добавить данные</b-button>

      <b-modal id="modal" hide-footer @hide="modalHidden">
        <template #modal-title>
          {{helpers.name}}
        </template>
        <div class="form">
          <div :class="!isSaved ? 'form-show' : 'form-hide'">
            <div class="form-group col">
              <label for="new-date">Дата</label>
              <date-picker v-model="form.date" type="datetime" class="d-block w-100" id="new-date" />
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
              <label for="new-distance">Растояние (м)</label>
              <input type="number" v-model.number="form.distance" class="form-control" id="new-distance" placeholder="Растояние">
            </div>
          </div>
          <div>
            <!-- <div class="success-checkmark">
              <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
              </div>
            </div> -->
            <div v-if="isSuccess" class="swal2-icon swal2-success swal2-animate-success-icon" style="display: flex;">
              <div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div>
                <span class="swal2-success-line-tip"></span>
                <span class="swal2-success-line-long"></span>
                <div class="swal2-success-ring"></div> 
                <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div>
              <div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div>
            </div>
            <div v-if="isError" class="swal2-icon swal2-error swal2-animate-error-icon" style="display: flex;">
              <span class="swal2-x-mark">
                <span class="swal2-x-mark-line-left"></span>
                <span class="swal2-x-mark-line-right"></span>
              </span>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <b-button class="mt-3 mr-3" variant="outline-danger" @click="$bvModal.hide('modal')">Закрыть</b-button>
          <b-button class="mt-3" variant="primary" @click="onSave()">Сохранить</b-button>
        </div>
      </b-modal>
    </div>
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="form-group">
          <label for="column">Столбец</label>
          <select name="column" class="custom-select" :class="error ? 'border-danger' : ''" @change="onSetFilters($event, 'column')" id="column">
            <option value="" selected><i>Не выбрано</i></option>
            <option value="name">Название</option>
            <option value="quantity">Количество</option>
            <option value="distance">Расстояние</option>
          </select>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="form-group">
          <label for="condition">Условие</label>
          <select name="condition" class="custom-select" :class="error ? 'border-danger' : ''" @change="onSetFilters($event, 'condition')" id="condition">
            <option value="" selected><i>Не выбрано</i></option>
            <option value="equal">Равно</option>
            <option value="contains">Содержит</option>
            <option value="greater">Больше</option>
            <option value="less">Меньше</option>
          </select>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="form-group">
          <label for="search">Поиск</label>
          <div class="d-flex align-items-center" style="position:relative;">
            <input type="text" class="form-control" :class="error ? 'border-danger' : ''" id="search" @input="onSearch($event)" placeholder="Найти...">
            <div v-if="loading" class="spinner-grow spinner-grow-sm" role="status" style="position:absolute;right:5px;"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row overflow-auto">
      <div class="col-12">
        <table class="table">
          <th>#</th>
          <th>Дата</th>
          <th>
            <div class="d-flex">
              <span>Название</span>
              <div @click="onSort('name')" class="d-flex flex-column ml-2 sorting">
                <b-icon icon="caret-up-fill" style="position:absolute;top:0;" :style="sorting.name === 1 ? 'opacity: 1;' : 'opacity: 0.4;'" />
                <b-icon icon="caret-down-fill" style="position:absolute;bottom:-2px;" :style="sorting.name === 2 ? 'opacity: 1;' : 'opacity: 0.4;'" />
              </div>
            </div>
          </th>
          <th>
            <div class="d-flex">
              <span>Количество</span>
              <div @click="onSort('quantity')" class="d-flex flex-column ml-2 sorting">
                <b-icon icon="caret-up-fill" style="position:absolute;top:0;" :style="sorting.quantity === 1 ? 'opacity: 1;' : 'opacity: 0.4;'" />
                <b-icon icon="caret-down-fill" style="position:absolute;bottom:-2px;" :style="sorting.quantity === 2 ? 'opacity: 1;' : 'opacity: 0.4;'" />
              </div>
            </div>
          </th>
          <th>
            <div class="d-flex">
              <span>Расстояние</span>
              <div @click="onSort('distance')" class="d-flex flex-column ml-2 sorting">
                <b-icon icon="caret-up-fill" style="position:absolute;top:0;" :style="sorting.distance === 1 ? 'opacity: 1;' : 'opacity: 0.4;'" />
                <b-icon icon="caret-down-fill" style="position:absolute;bottom:-2px;" :style="sorting.distance === 2 ? 'opacity: 1;' : 'opacity: 0.4;'" />
              </div>
            </div>
          </th>
          <th>Действия</th>
          <tr v-for="item in items" class="row-hover" :class="{'row-active': form.id === item.id}" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{new Date(item.date).toLocaleString()}}</td>
            <td>{{item.name}}</td>
            <td>{{item.quantity}}</td>
            <td>{{item.distance}}м</td>
            <td>
              <div class="d-flex" style="font-size: 2rem;">
                <b-icon icon="pencil-square" class="rounded-circle bg-info p-2 mr-3 edit" variant="light" style="cursor:pointer;" @click="onEdit(item)"></b-icon>
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
            <td colspan="6">
              <div class="text-center">
                <span v-if="!error">Нет данных</span>
                <span v-else>Ошибка фильтрации</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-between align-items-center">
      <div class="d-flex flex-column flex-md-row align-items-center">
        <div class="pagination">
          <button class="btn btn-info mr-2" :disabled="pagination.current === 1" @click="prevPage()">&#60;</button>
          <span v-for="(page, key) in pagination.pages" :key="key">
            <button class="btn mr-2" :class="pagination.current - 1 === key ? 'btn-primary' : 'btn-info'" @click="onSetPage(key+1)">{{key + 1}}</button>
          </span>
          <button class="btn btn-info" :disabled="pagination.current === pagination.pages" @click="nextPage()">&#62;</button>
        </div>
        <div class="ml-3">
          {{$store.state.skip + 1 + $store.state.take*($store.state.pagination.current-1)}} - {{items.length + $store.state.take*($store.state.pagination.current-1)}} из {{pagination.total}}
        </div>
      </div>
      <div class="per-page">
        <select name="per-page" class="custom-select" @change="onSetPerPage($event)" id="">
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
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
      helpers: {
        name: 'Добавить данные',
        action: 'add'
      },
      pages: 10,
      form: {
        date: new Date(),
        name: '',
        quantity: '',
        distance: '',
      },
      sorting: {
        name: 0,
        quantity: 0,
        distance: 0,
      },
      isSaved: false,
      isSuccess: false,
      isError: false,
      loading: false
    }
  },
  computed: {
    items(){
      return this.$store.state.items
    },
    pagination(){
      return this.$store.state.pagination
    },
    error(){
      return this.$store.state.error
    }
  },
  methods: {
    onSort(column){
      this.sorting[column] === 2 ? this.sorting[column] = 0 : this.sorting[column]++
      this.$store.commit('setSorting', this.sorting)
      this.$store.dispatch('getData')
    },
    modalHidden(){
      this.form = {
        date: new Date(),
        name: '',
        quantity: '',
        distane: '',
      }
    },
    onSearch(e){
      this.status = true
			this.$store.commit('setQuery', e.target.value)
      this.$store.dispatch('getData')
      this.status = false
    },
    onSetFilters(e, type){
      this.$store.commit('setFilters', {value: e.target.value, type})
      this.$store.dispatch('getData')
    },
    onSetPage(page){
      this.$store.commit('setPage', page)
      this.$store.dispatch('getData')
    },
    nextPage(){
      this.$store.commit('setNextPage')
      this.$store.dispatch('getData')
    },
    prevPage(){
      this.$store.commit('setPrevPage')
      this.$store.dispatch('getData')
    },
    onSetPerPage(e){
      this.$store.commit('setTake', e.target.value)
      this.$store.dispatch('getData')
    },
    onEdit(item){
      this.isSaved = false
      this.helpers = {
        name: `Редактирование ${item.name}`,
        action: 'edit'
      }
      this.form = {...item, date: new Date(item.date)}
      this.$bvModal.show('modal')
    },
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
      let func = 'addItem'
      if(this.helpers.action === 'edit'){
        func = 'editItem'
      }
      this.$store.dispatch(func, this.form).then(res => {
        this.$store.dispatch('getData')
        this.isSaved = !this.isSaved
        if(res.message === 'success'){
          this.isSuccess = true
          setTimeout(() => {
            this.$bvModal.hide('modal')
            this.form = {
              date: new Date(),
              name: '',
              quantity: 0,
              distane: 0,
            }
            this.isSuccess = false
          }, 1500)
        } else {
          this.isError = true
          setTimeout(() => {
            this.isSaved = !this.isSaved
            setTimeout(() => {
              this.isError = false
            }, 100);
          }, 1000);
        }
      })
    },
    onAddItem(){
      this.helpers = {
        name: 'Добавить данные',
        action: 'add'
      }
      this.form = {
        date: new Date(),
        name: '',
        quantity: '',
        distance: '',
      }
      this.isSaved = false
      this.$bvModal.show('modal')
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
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 45%) !important;
}
.delete:hover{
  background: #a52734 !important;
}
.edit:hover{
  background: #138091 !important;
}
.row-hover{
  transition: all .4s ease;
}
.row-hover:hover, .row-active{
  background: #eee;
}
.sorting{
  position:relative;
  width:20px;
  cursor:pointer;
  user-select:none;
}
</style>