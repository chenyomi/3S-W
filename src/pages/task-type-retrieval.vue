<script setup>
const active = ref(-1)

const submit = () => {
  return new Promise(resolve => {

    resolve(active.value)
    
  })
}



defineExpose({
  submit,
})
</script>

<template>
  <VContainer>
    <div class="d-flex justify-center py-10 gap-8 align-center h-100 text-center">
      <VCard
        class="py-15"
        width="160"
        border
        :color="active === 0 ? '#7986CB' :''"
        @click="() => {active = 0}"
      >
        <VIcon
          icon="bx-package"
          size="45"
          rounded
          variant="tonal"
        />
        <div class="mt-2">
          {{ $t('料箱') }}
        </div>
      </VCard>
      <VCard
        class="py-15"
        width="160"
        border
        :color="active === 1 ? '#7986CB' :''"
        @click="() => {active = 1}"
      >
        <VIcon
          icon="bx-layer"
          size="45"
          rounded
        />
        <div class="mt-2">
          {{ $t('料盘') }}
        </div>
      </VCard>
    </div>
  </VContainer>
</template>
