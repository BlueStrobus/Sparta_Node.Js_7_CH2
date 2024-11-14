import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { getRandomInt } from './server.js';

//
class Player {
  constructor(hp, fullness) {
    // 플레이어 만 들 때 부여하기(100X hp O)
    this.hp = 100;
    this.fullness = 70;
    this.happiness = 40;
    this.pAttack = 20;
  }
  attack() {
    return this.attack;
  }
}

class iceMonster {
  constructor() {
    this.hp = 100;
  }

  attack() {
    // 몬스터의 공격
    Player.hp -= 3;
  }
}

class humanMonster {
  constructor() {
    this.hp = 100;
  }

  attack() {
    // 몬스터의 공격
    Player.hp -= 5;
  }
  damage(n) {
    this.hp -= n;
  }
}

function displayStatus(stage, player) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
      chalk.blueBright(`| 플레이어 정보`) +
      chalk.redBright(`| 몬스터 정보 |`),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
  let logs = []; // 배열에 플레이어의 선택에 따라 다음 행동넣기

  while (player.hp > 0) {
    console.clear(); // 다 지움
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log)); // 이전에 한 선택 (logs.push)화면에 모두 반영

    // readlineSync로 입력받기
    //console.log(chalk.green(`\n1. 공격한다 2. 아무것도 하지않는다.`));

    console.log('사람을 만났다');
    console.log(chalk.green(`\n1. 도와준다. 2. 도망간다.`));
    const choice = readlineSync.question('당신의 선택은? ');
    // 내가 입력, 선택
    // 조건문 여기에(빼는건 나중에)
    if (choice === '1') {
      logs.push(chalk.green(`도와주기를 선택하셨습니다.`));

      if (getRandomInt(10) <= 7) {
        logs.push(chalk.green('사람에게 공격당하셨습니다.'));
      } else {
        logs.push(chalk.green('사람을 도와 얼음을 부수세요.'));
      }
    } else if (choice === '2') {
      //사람으로부터 도망
      logs.push(chalk.green(`도망가기를 선택하셨습니다.`));
    }

    if (logs[logs.length - 1] === '사람에게 공격당하셨습니다.') {
      console.log('공격');
      while (humanMonster.hp <= 0) {
        console.log(chalk.green(`\n1. 공격한다. 2. 방어한다. 3.도망간다.`));
        const choice = readlineSync.question('당신의 선택은? ');
        switch (choice) {
          case '1':
            console.log(chalk.green('공격한다.'));
            // logs.push없이 공격, 방어만
            if (getRandomInt <= 3) {
              // 데미지 받음
              player.humanAttack;
              humanMonster.attack;
              console.log(`사람을 공격해 데미지 10을 입혔다.\n공격을 받아 hp5가 감소했다.`);
            } else {
              player.humanAttack;
              console.log('사람을 공격해 데미지 10을 입혔다.');
            }
            break;
          case '2':
            console.log(chalk.yellow('방어한다.'));
            // logs.push없이 공격, 방어만
            if (getRandomInt <= 3) {
              // 데미지 받음
              console.log('공격을 받았지만 방어했다.');
            } else {
              console.log('방어했다.');
            }
            break;
          case '3':
            console.log(chalk.blue('도망간다.'));
            logs.push(chalk.green('도망가기를 선택하셨습니다.'));
            break;
        }
      }

      // 보상
      player.fullness = 100;
      player.happiness -= 5;
    }
    if (logs[logs.length - 1] === '사람을 도와 얼음을 부수세요.') {
      while (iceMonsterMonster.hp <= 0) {
        console.log(chalk.green(`\n1. 얼음 부수기`));
        const choice = readlineSync.question('당신의 선택은? ');
        if (choice === '1') {
          console.log(chalk.green('공격한다.'));
          // logs.push없이 공격, 방어만
          if (getRandomInt <= 1) {
            // 데미지 받음
            player.iceAttack;
            iceMonster.attack;
            console.log(`얼음의 내구력이 10 감소했다.\n얼음이 튀여 hp3이 감소했다.`);
          } else {
            player.iceAttack;
            console.log(`얼음의 내구력이 10 감소했다.`);
          }
        }
      }

      // 보상
      console.log(`얼음 속의 빵을 얻었습니다.`);
      player.fullness += 10;
      player.happiness += 5;
      logs.push(chalk.green(`얼음을 부쉈습니다.`));
    }

    // 1.사람을 만났다
    // 1-1 도와준다
    //2-1 사람한테 맞는다(70%)
    // 3-1 때린다
    // 3-2 방어
    // 3-3 도망
    //2-2 도와주고 얻기(30%)

    // 1-2 도망간다

    // 플레이어의 선택에 따라 다음 행동 처리
    //logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
  }
};

export async function startGame() {
  //
  console.clear();
  let player = new Player(); //
  const hMonster = new humanMonster(); /////
  let stage = 1;

  while (stage <= 10) {
    // 게임 시작 선택하면 여기에서 플레이어가 게임시작을 다시 한다???
    // const monster = new Monster(stage);
    await battle(stage, player);

    // 스테이지 클리어 및 게임 종료 조건

    stage++;
  }
}
