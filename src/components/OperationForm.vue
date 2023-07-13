<template>
  <v-dialog v-model="display" width="400px">
    <v-card class="pa-2">
      <v-card-title class="text-right color-comment">
        New Operation
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-select
              :items="operationStore.operations"
              item-title="type"
              variant="outlined"
              label="Operation"
              v-model="selected"
              :rules="operationRules"
              required
            ></v-select>
            <v-text-field
              v-for="n in selectedOperation?.operands"
              :key="`operand-${n}`"
              v-model.number="formOperands[n - 1]"
              variant="outlined"
              :label="`Operand ${n}`"
              :rules="operandRules"
              required
            ></v-text-field>
            <v-label class="mt-2 w-100 justify-end">
              Cost: ${{ formatNumber(+(selectedOperation?.cost || 0)) }}
            </v-label>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" variant="outlined" @click="display = false">
          Close
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          elevation="0"
          @click="submitOperation"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useOperationStore } from '@/stores/operation';
import { useUIStore } from '@/stores/ui';
import { formatNumber } from '@/intl/formatter';

const operationStore = useOperationStore();
const UIStore = useUIStore();

const display = ref(false);
const formOperands = ref<number[]>([]);
const selected = ref<string | undefined>();
const form = ref<HTMLFormElement>();

const operandRules = [
  (v: string) => !!v || 'Required',
  (v: string) => !isNaN(Number(v)) || 'Must be a number',
];
const operationRules = [(v: string) => !!v || 'Required'];

const selectedOperation = computed(() =>
  operationStore.operations.find(
    (operation) => operation.type === selected.value
  )
);

const displayDialog = () => {
  display.value = true;
};

const resetForm = () => {
  form.value?.reset();
};

const submitOperation = async () => {
  const { valid } = await (form.value?.validate() ?? {});
  if (selectedOperation.value && valid) {
    const operands: string[] = [];

    for (let i = 0; i < selectedOperation.value.operands; i++) {
      operands.push(formOperands.value[i].toString());
    }

    await operationStore.submitOperation({
      operation_type: selectedOperation.value.type,
      operands: operands,
    });

    UIStore.displaySuccess(
      `Operation submitted, balance deducted: $${formatNumber(
        +selectedOperation.value?.cost
      )}`
    );
    display.value = false;
    resetForm();
  }
};

defineExpose({ displayDialog });
</script>

<style scoped></style>
