<template>
  <div class="row pt-4">
    <div class="col-12 d-flex justify-content-end align-items-center mb-2">
      <button class="btn btn-primary">Добавить данные</button>
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
        <tr>
          <!-- <td>08.10.2022</td>
          <td>Тест</td>
          <td>10</td>
          <td>500м</td> -->
        </tr>
        <tr>
          <td colspan="4">
            <div class="text-center">Нет данных</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>

<style>

</style>