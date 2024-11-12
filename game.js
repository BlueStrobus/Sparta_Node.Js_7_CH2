import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor() {
    this.hp = 100;
    this.fullness = 50;
    this.happiness = 50;
    this.inventory = [];
  }

  increaseStat(stat, amount) {
    this[stat] = Math.min(this[stat] + amount, 100);
    console.log(chalk.green(`\n${stat}가 ${amount}만큼 증가했습니다!`));
  }

  decreaseStat(stat, amount) {
    this[stat] = Math.max(this[stat] - amount, 0);
    console.log(chalk.red(`\n${stat}가 ${amount}만큼 감소했습니다!`));
  }
}

class Event {
  constructor(description, choices, outcomes) {
    this.description = description;
    this.choices = choices;
    this.outcomes = outcomes;
  }

  trigger(player) {
    console.log(chalk.yellow(this.description));
    this.choices.forEach((choice, i) => console.log(`${i + 1}. ${choice}`));

    const choice = readlineSync.question('\n선택: ');
    const outcome = this.outcomes[choice - 1];

    console.log(chalk.green(`\n${outcome.description}`));
    outcome.effects.forEach((effect) => player[effect.action](effect.stat, effect.amount));
    console.log('\n');
  }
}

function createRandomEvent() {
  const squirrelEvent = new Event(
    '길 앞에 다람쥐들이 얼음 속에서 도토리를 꺼내려 고생하고 있네요. 도와주시겠습니까?',
    ['도와준다', '무시한다'],
    [
      {
        // 얼음 vs 북극곰 전투 시작
        description: '도토리를 꺼내주고 다람쥐들에게 감사를 받았습니다. 소소한 음식을 얻었습니다.',
        effects: [
          { action: 'increaseStat', stat: 'fullness', amount: 10 },
          { action: 'increaseStat', stat: 'happiness', amount: 5 },
        ],
      },
      {
        description: '무시하고 지나갑니다.',
        effects: [{ action: 'decreaseStat', stat: 'happiness', amount: 5 }],
      },
    ],
  );

  const humanEvent = new Event(
    '사람들이 얼음에 갇힌 무언가를 꺼내고 있습니다. 도와주시겠습니까?',
    ['도와준다', '무시한다'],
    [
      {
        // 얼음 vs 북극곰 전투 시작
        description: '도와주다 공격을 받았습니다! 체력이 감소했습니다.', // 공격 받지 않고 도와주고 아이템 얻기, 공격받으면 인간 vs 북극곰 넣기
        effects: [{ action: 'decreaseStat', stat: 'hp', amount: 15 }],
      },
      {
        description: '무시하고 지나갑니다.',
        effects: [{ action: 'increaseStat', stat: 'happiness', amount: 3 }],
      },
    ],
  );

  return Math.random() > 0.5 ? squirrelEvent : humanEvent;
}

export async function startGame() {
  const player = new Player();
  let stage = 1;

  while (player.hp > 0 && stage <= 10) {
    console.clear();
    console.log(chalk.magentaBright(`\n===== Stage ${stage} =====`));
    console.log(
      chalk.cyan(`체력: ${player.hp}, 포만감: ${player.fullness}, 행복: ${player.happiness}`),
    );

    const event = createRandomEvent();
    event.trigger(player);

    if (player.hp <= 0) {
      console.log(chalk.red('\n게임 오버! 북극곰이 여행에서 사망했습니다.'));
      break;
    }

    if (stage === 10) {
      console.log(chalk.green('\n축하합니다! 모든 스테이지를 클리어하고 여행을 완료했습니다!'));
      break;
    }

    stage++;
    readlineSync.question('\n다음 스테이지로 이동하려면 Enter 키를 누르세요...');
  }
}
