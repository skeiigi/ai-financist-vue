<template>
  <div class="container" style="display: flex; flex-direction: column; height: 80vh;">
    <h1 style="margin-bottom: 10px;">AI-Финансист</h1>
    <p style="font-size: 14px; color: #6b7280; margin-bottom: 20px;">Твой личный помощник по накоплениям</p>

    <div class="card" style="flex-grow: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; padding: 15px;">
      
      <div style="align-self: flex-start; background: #f3f4f6; padding: 12px; border-radius: 15px 15px 15px 5px; max-width: 80%; font-size: 14px;">
        Привет! Я проанализировал твои траты за неделю. Ты потратил на 15% больше на категорию "Еда", чем планировал. Хочешь составить план экономии?
      </div>

      <div style="align-self: flex-end; background: #2563eb; color: white; padding: 12px; border-radius: 15px 15px 5px 15px; max-width: 80%; font-size: 14px;">
        Да, помоги мне отложить 5000 ₽ на новую видеокарту.
      </div>

      <div style="align-self: flex-start; background: #f3f4f6; padding: 12px; border-radius: 15px 15px 15px 5px; max-width: 80%; font-size: 14px;">
        Понял! Чтобы достичь цели к июню, рекомендую сократить расходы на транспорт и брать кофе с собой. Начинаем?
      </div>

    </div>

    <div style="display: flex; gap: 10px; margin-top: 10px;">
      <input type="text" class="input-field" placeholder="Спросите что-нибудь..." disabled>
      <button class="btn-primary" style="width: auto; padding: 10px 20px;">▲</button>
    </div>
  </div>
</template>