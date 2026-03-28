export interface Service {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  descriptionJa: string;
  priceUSD: number;
  delivery: string;
  deliveryJa: string;
}

export interface Game {
  id: string;
  name: string;
  nameJa: string;
  slug: string;
  image: string;
  description: string;
  descriptionJa: string;
  services: Service[];
}

export const games: Game[] = [
  {
    id: "dota-2",
    name: "Dota 2",
    nameJa: "Dota 2",
    slug: "dota-2",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/570/library_600x900.jpg",
    description: "Unlock your potential in Dota 2 with coaching from experienced players. From laning to drafting, our coaches help you understand the deep strategic layers of the game.",
    descriptionJa: "経験豊富なプレイヤーのコーチングでDota 2のポテンシャルを解放。レーニングからドラフトまで、ゲームの深い戦略レイヤーの理解をサポートします。",
    services: [
      {
        id: "dota2-hero-mastery",
        name: "Hero Mastery Session",
        nameJa: "ヒーローマスターセッション",
        description: "Focus on mastering a specific hero: optimal skill builds, item timings, power spikes, and matchup knowledge to play your hero at a higher level.",
        descriptionJa: "特定のヒーローの習得に集中：最適なスキルビルド、アイテムタイミング、パワースパイク、マッチアップ知識で、より高いレベルでプレイしましょう。",
        priceUSD: 24.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "dota2-laning-breakdown",
        name: "Laning Phase Breakdown",
        nameJa: "レーニングフェーズブレイクダウン",
        description: "Master the first 10 minutes: creep equilibrium, trading, pulling, stacking, and securing farm while denying your opponent's resources.",
        descriptionJa: "最初の10分をマスター：クリープの均衡、トレード、プル、スタック、ファームの確保と相手のリソース妨害を学びましょう。",
        priceUSD: 22.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "dota2-draft-analysis",
        name: "Draft Analysis & Strategy",
        nameJa: "ドラフト分析＆戦略",
        description: "Learn how to read drafts, identify win conditions, counter-pick effectively, and build team compositions that synergize for victory.",
        descriptionJa: "ドラフトの読み方、勝利条件の特定、効果的なカウンターピック、勝利に向けたチーム構成の構築方法を学びましょう。",
        priceUSD: 29.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "dota2-replay-analysis",
        name: "Replay Analysis (3 Games)",
        nameJa: "リプレイ分析（3試合）",
        description: "Submit 3 of your recent replays and receive detailed analysis covering your decision-making, positioning, itemization, and key turning points in each game.",
        descriptionJa: "最近の3試合のリプレイを提出し、意思決定、ポジショニング、アイテム選択、各試合の重要なターニングポイントについて詳細な分析を受けましょう。",
        priceUSD: 34.99,
        delivery: "90 min session",
        deliveryJa: "90分のセッション"
      },
      {
        id: "dota2-role-training",
        name: "Support/Carry Role Training",
        nameJa: "サポート/キャリーロールトレーニング",
        description: "Role-specific coaching tailored to your position. Carries learn farming patterns and fight timing; supports learn warding, rotations, and resource management.",
        descriptionJa: "ポジションに特化したロール別コーチング。キャリーはファーミングパターンと戦闘タイミングを、サポートはワード、ローテーション、リソース管理を学びます。",
        priceUSD: 27.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      }
    ]
  },
  {
    id: "league-of-legends",
    name: "League of Legends",
    nameJa: "リーグ・オブ・レジェンド",
    slug: "league-of-legends",
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
    description: "Master the Rift with personalized coaching from high-elo mentors. Learn macro strategy, lane mechanics, and champion mastery to climb the ranked ladder with confidence.",
    descriptionJa: "ハイレートのメンターによるパーソナルコーチングでサモナーズリフトを制覇。マクロ戦略、レーン操作、チャンピオン習熟を学び、自信を持ってランクを上げましょう。",
    services: [
      {
        id: "lol-live-coaching",
        name: "1-on-1 Live Coaching (1hr)",
        nameJa: "1対1ライブコーチング（1時間）",
        description: "A dedicated hour with a Diamond+ coach who watches your gameplay in real-time, providing immediate feedback on positioning, trading, and decision-making.",
        descriptionJa: "ダイヤモンド以上のコーチがリアルタイムであなたのプレイを観察し、ポジショニング、トレード、意思決定について即座にフィードバックを提供する1時間のセッションです。",
        priceUSD: 24.99,
        delivery: "1 hour live session",
        deliveryJa: "1時間のライブセッション"
      },
      {
        id: "lol-vod-review",
        name: "VOD Review Session",
        nameJa: "VODレビューセッション",
        description: "Submit a replay and receive a detailed breakdown of your mistakes, missed opportunities, and areas for improvement with timestamped coaching notes.",
        descriptionJa: "リプレイを提出すると、ミス、逃した機会、改善点について、タイムスタンプ付きのコーチングノートとともに詳細な分析を受け取れます。",
        priceUSD: 19.99,
        delivery: "60 min live coaching",
        deliveryJa: "60分のライブコーチング"
      },
      {
        id: "lol-lane-mastery",
        name: "Lane Mastery Course (3 Sessions)",
        nameJa: "レーンマスターコース（3セッション）",
        description: "A structured 3-session program focused on laning fundamentals: wave management, trading patterns, back timing, and jungle tracking tailored to your main role.",
        descriptionJa: "ウェーブ管理、トレードパターン、リコールタイミング、ジャングル追跡など、メインロールに合わせたレーニング基礎に焦点を当てた3セッション構成のプログラムです。",
        priceUSD: 59.99,
        delivery: "3 sessions (1hr each)",
        deliveryJa: "3セッション（各1時間）"
      },
      {
        id: "lol-macro-strategy",
        name: "Macro Strategy Workshop",
        nameJa: "マクロ戦略ワークショップ",
        description: "Learn map awareness, objective control, rotation timing, and team fight positioning from a coach who specializes in game-winning macro play.",
        descriptionJa: "マップ認識、オブジェクト管理、ローテーションのタイミング、チームファイトのポジショニングを、マクロプレイ専門のコーチから学びましょう。",
        priceUSD: 29.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "lol-champion-pool",
        name: "Champion Pool Optimization",
        nameJa: "チャンピオンプール最適化",
        description: "Your coach analyzes your playstyle, rank, and goals to build a focused champion pool that maximizes your climb potential and minimizes weaknesses.",
        descriptionJa: "コーチがあなたのプレイスタイル、ランク、目標を分析し、上昇ポテンシャルを最大化し弱点を最小化する最適なチャンピオンプールを構築します。",
        priceUSD: 34.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "lol-duo-coaching",
        name: "Duo Coaching Session (2hrs)",
        nameJa: "デュオコーチングセッション（2時間）",
        description: "Play ranked games alongside your coach in duo queue. Receive real-time callouts, decision-making guidance, and post-game analysis to accelerate your learning.",
        descriptionJa: "コーチとデュオキューでランク戦をプレイ。リアルタイムのコールアウト、意思決定のガイダンス、試合後の分析で学習を加速させましょう。",
        priceUSD: 44.99,
        delivery: "2 hour session",
        deliveryJa: "2時間のセッション"
      }
    ]
  },
  {
    id: "counter-strike-2",
    name: "Counter-Strike 2",
    nameJa: "カウンターストライク2",
    slug: "counter-strike-2",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/730/library_600x900.jpg",
    description: "Elevate your CS2 gameplay with coaching from experienced players. Master utility lineups, economy management, and team coordination to dominate competitive matches.",
    descriptionJa: "経験豊富なプレイヤーのコーチングでCS2のゲームプレイを向上。ユーティリティラインナップ、エコノミー管理、チーム連携をマスターして競技マッチを支配しましょう。",
    services: [
      {
        id: "cs2-utility-workshop",
        name: "Utility & Smoke Workshop",
        nameJa: "ユーティリティ＆スモークワークショップ",
        description: "Learn essential smoke, flash, and molotov lineups for key maps. Your coach demonstrates setups in-game and helps you practice until they become muscle memory.",
        descriptionJa: "主要マップの必須スモーク、フラッシュ、モロトフのラインナップを学習。コーチがゲーム内でセットアップを実演し、体に覚え込むまで練習をサポートします。",
        priceUSD: 24.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "cs2-aim-mechanics",
        name: "Aim Mechanics Training",
        nameJa: "エイムメカニクストレーニング",
        description: "Improve your spray patterns, counter-strafing, and one-tap accuracy through structured aim training drills and personalized feedback on your technique.",
        descriptionJa: "構造化されたエイムトレーニングドリルとテクニックへのパーソナルフィードバックで、スプレーパターン、カウンターストレイフ、ワンタップ精度を向上させましょう。",
        priceUSD: 19.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "cs2-economy-strategy",
        name: "Economy & Buy Strategy",
        nameJa: "エコノミー＆バイ戦略",
        description: "Understand when to force buy, eco, or save. Learn how to read the enemy economy and make optimal purchasing decisions that win more rounds.",
        descriptionJa: "フォースバイ、エコ、セーブのタイミングを理解。敵のエコノミーを読み解き、より多くのラウンドを勝ち取る最適な購入判断を学びましょう。",
        priceUSD: 22.99,
        delivery: "45 min session",
        deliveryJa: "45分のセッション"
      },
      {
        id: "cs2-map-control",
        name: "Map Control Masterclass",
        nameJa: "マップコントロールマスタークラス",
        description: "A comprehensive session on taking and holding map control, reading opponent rotations, and using information plays to gain a strategic advantage.",
        descriptionJa: "マップコントロールの確保と維持、相手のローテーション読み、情報プレイを活用した戦略的アドバンテージの獲得に関する包括的なセッションです。",
        priceUSD: 29.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "cs2-igl-coaching",
        name: "Team IGL Coaching",
        nameJa: "チームIGLコーチング",
        description: "Learn in-game leadership: calling strategies, mid-round adjustments, reading the enemy team, and keeping your team coordinated under pressure.",
        descriptionJa: "ゲーム内リーダーシップを学習：戦略コール、ラウンド中の調整、敵チームの読み、プレッシャー下でのチーム連携維持を身につけましょう。",
        priceUSD: 39.99,
        delivery: "1.5 hour session",
        deliveryJa: "1.5時間のセッション"
      }
    ]
  },
  {
    id: "valorant",
    name: "Valorant",
    nameJa: "ヴァロラント",
    slug: "valorant",
    image: "https://images.igdb.com/igdb/image/upload/t_1080p/co2mvt.jpg",
    description: "Sharpen your aim, refine your agent play, and develop winning strategies with expert Valorant coaches. From crosshair placement to map control, we cover it all.",
    descriptionJa: "エイムを磨き、エージェントプレイを洗練させ、専門のヴァロラントコーチと勝利戦略を構築。クロスヘア配置からマップコントロールまで、すべてをカバーします。",
    services: [
      {
        id: "val-aim-training",
        name: "Aim Training Session (1hr)",
        nameJa: "エイムトレーニングセッション（1時間）",
        description: "Focused training on crosshair placement, flick accuracy, spray control, and peeking mechanics with personalized drills and practice routines.",
        descriptionJa: "クロスヘア配置、フリックの精度、スプレーコントロール、ピーク操作に焦点を当て、パーソナライズされたドリルと練習ルーティンを提供します。",
        priceUSD: 19.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "val-agent-mastery",
        name: "Agent Mastery Coaching",
        nameJa: "エージェントマスターコーチング",
        description: "Deep dive into your chosen agent's utility usage, positioning, and role-specific strategies to maximize your impact every round.",
        descriptionJa: "選択したエージェントのユーティリティ使用、ポジショニング、ロール別戦略を深掘りし、毎ラウンドの影響力を最大化します。",
        priceUSD: 24.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "val-map-strategy",
        name: "Map Strategy Breakdown",
        nameJa: "マップ戦略ブレイクダウン",
        description: "Learn site executes, retake setups, default positions, and rotational timing for your most-played maps with a coach who breaks down pro-level strategies.",
        descriptionJa: "プロレベルの戦略を分析するコーチと共に、よくプレイするマップのサイト攻略、リテイク設定、デフォルトポジション、ローテーションタイミングを学びましょう。",
        priceUSD: 29.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "val-ranked-mentorship",
        name: "Ranked Mentorship (3 Sessions)",
        nameJa: "ランクメンターシップ（3セッション）",
        description: "A 3-session mentorship program covering aim fundamentals, game sense, and ranked mindset to help you break through your current plateau.",
        descriptionJa: "エイムの基礎、ゲームセンス、ランクドマインドセットをカバーする3セッションのメンターシッププログラムで、現在のプラトーを突破しましょう。",
        priceUSD: 64.99,
        delivery: "3 sessions (1hr each)",
        deliveryJa: "3セッション（各1時間）"
      },
      {
        id: "val-crosshair-settings",
        name: "Crosshair & Settings Optimization",
        nameJa: "クロスヘア＆設定最適化",
        description: "A coach reviews your sensitivity, crosshair, keybinds, and video settings, then optimizes them for your playstyle and hardware for an immediate edge.",
        descriptionJa: "コーチが感度、クロスヘア、キーバインド、ビデオ設定を確認し、プレイスタイルとハードウェアに合わせて最適化することで、即座にアドバンテージを得られます。",
        priceUSD: 14.99,
        delivery: "30 min session",
        deliveryJa: "30分のセッション"
      }
    ]
  },
  {
    id: "apex-legends",
    name: "Apex Legends",
    nameJa: "エーペックスレジェンズ",
    slug: "apex-legends",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1172470/library_600x900.jpg",
    description: "Improve your Apex gameplay with coaching focused on movement, gunplay, and game sense. Our coaches help you win more fights and climb through ranked tiers.",
    descriptionJa: "ムーブメント、ガンプレイ、ゲームセンスに焦点を当てたコーチングでApexのゲームプレイを向上。より多くの戦闘に勝ち、ランクティアを上げましょう。",
    services: [
      {
        id: "apex-movement-coaching",
        name: "Movement & Rotation Coaching",
        nameJa: "ムーブメント＆ローテーションコーチング",
        description: "Learn advanced movement techniques, optimal rotation paths, and positioning strategies that give you a competitive edge in every engagement.",
        descriptionJa: "高度なムーブメントテクニック、最適なローテーションパス、すべての交戦で競争力を高めるポジショニング戦略を学びましょう。",
        priceUSD: 24.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "apex-legend-mastery",
        name: "Legend Mastery Session",
        nameJa: "レジェンドマスターセッション",
        description: "Master your main legend's abilities, optimal usage timing, and synergies with team compositions to maximize your contribution to the squad.",
        descriptionJa: "メインレジェンドのアビリティ、最適な使用タイミング、チーム構成とのシナジーをマスターし、スクワッドへの貢献を最大化しましょう。",
        priceUSD: 19.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "apex-gun-skill",
        name: "Gun Skill Workshop",
        nameJa: "ガンスキルワークショップ",
        description: "Focused training on recoil control, tracking, flicking, and weapon selection to improve your accuracy and time-to-kill in gunfights.",
        descriptionJa: "リコイルコントロール、トラッキング、フリック、武器選択に焦点を当て、ガンファイトでの精度とキルタイムを向上させるトレーニングです。",
        priceUSD: 22.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "apex-ranked-strategy",
        name: "Ranked Strategy Session",
        nameJa: "ランク戦略セッション",
        description: "Learn how to gain RP efficiently: when to fight, when to rotate, how to position for endgame, and how to avoid common mistakes that cost points.",
        descriptionJa: "効率的なRP獲得方法を学習：戦うタイミング、ローテーションのタイミング、終盤のポジショニング、ポイントを失う一般的なミスの回避方法。",
        priceUSD: 29.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "apex-team-coordination",
        name: "Team Coordination Training",
        nameJa: "チーム連携トレーニング",
        description: "Improve your team communication, focus fire coordination, push timing, and retreat decisions to operate as a more effective squad.",
        descriptionJa: "チームコミュニケーション、フォーカスファイアの連携、プッシュタイミング、撤退判断を改善し、より効果的なスクワッドとして活動しましょう。",
        priceUSD: 34.99,
        delivery: "1.5 hour session",
        deliveryJa: "1.5時間のセッション"
      }
    ]
  },
  {
    id: "fortnite",
    name: "Fortnite",
    nameJa: "フォートナイト",
    slug: "fortnite",
    image: "https://images.igdb.com/igdb/image/upload/t_1080p/co2ekt.jpg",
    description: "Level up your Fortnite skills with coaching that covers building, editing, game sense, and competitive strategy. Learn to outplay opponents and dominate Arena matches.",
    descriptionJa: "建築、編集、ゲームセンス、競技戦略をカバーするコーチングでフォートナイトのスキルをレベルアップ。対戦相手を出し抜き、アリーナマッチを支配しましょう。",
    services: [
      {
        id: "fn-building-editing",
        name: "Building & Editing Workshop",
        nameJa: "建築＆編集ワークショップ",
        description: "Master building techniques, edit plays, and piece control through structured drills. Your coach teaches you efficient patterns and helps you build speed and consistency.",
        descriptionJa: "構造化されたドリルで建築テクニック、編集プレイ、ピースコントロールをマスター。コーチが効率的なパターンを教え、スピードと一貫性の向上をサポートします。",
        priceUSD: 19.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "fn-box-fight",
        name: "Box Fight Training",
        nameJa: "ボックスファイトトレーニング",
        description: "Learn close-quarters combat strategies: piece control, right-hand peeks, edit plays, and fight IQ to consistently win box fights against skilled opponents.",
        descriptionJa: "近距離戦闘戦略を学習：ピースコントロール、右ハンドピーク、編集プレイ、ファイトIQで、スキルの高い対戦相手とのボックスファイトに勝ちましょう。",
        priceUSD: 22.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "fn-game-sense",
        name: "Game Sense Coaching",
        nameJa: "ゲームセンスコーチング",
        description: "Develop your decision-making, awareness, and fight selection. Learn when to engage, when to disengage, and how to read the game state for optimal plays.",
        descriptionJa: "意思決定、状況認識、戦闘選択を発達させましょう。交戦のタイミング、離脱のタイミング、最適なプレイのためのゲーム状態の読み方を学びます。",
        priceUSD: 24.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "fn-arena-strategy",
        name: "Arena Strategy Session",
        nameJa: "アリーナ戦略セッション",
        description: "Learn competitive strategies for Arena and tournaments: storm surge management, endgame rotations, and placement-focused gameplay to maximize your points.",
        descriptionJa: "アリーナやトーナメントの競技戦略を学習：ストームサージ管理、終盤のローテーション、ポイント最大化のための順位重視プレイ。",
        priceUSD: 29.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "fn-creative-practice",
        name: "Creative Practice Plan",
        nameJa: "クリエイティブ練習プラン",
        description: "Get a customized practice routine for Creative mode: aim training maps, building drills, and edit courses tailored to your skill level and improvement goals.",
        descriptionJa: "クリエイティブモード向けのカスタマイズされた練習ルーティン：スキルレベルと改善目標に合わせたエイムトレーニングマップ、建築ドリル、編集コース。",
        priceUSD: 17.99,
        delivery: "45 min session",
        deliveryJa: "45分のセッション"
      }
    ]
  },
  {
    id: "rocket-league",
    name: "Rocket League",
    nameJa: "ロケットリーグ",
    slug: "rocket-league",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/252950/library_600x900.jpg",
    description: "Take your car control and game sense to the next level with Rocket League coaching. From aerial mechanics to rotation fundamentals, our coaches cover every aspect of the game.",
    descriptionJa: "ロケットリーグのコーチングでカーコントロールとゲームセンスを次のレベルへ。エアリアルメカニクスからローテーションの基礎まで、ゲームのあらゆる側面をカバーします。",
    services: [
      {
        id: "rl-aerial-mechanics",
        name: "Aerial Mechanics Training",
        nameJa: "エアリアルメカニクストレーニング",
        description: "Learn aerial car control, double taps, air dribbles, and ceiling shots through guided practice sessions with real-time feedback from your coach.",
        descriptionJa: "ガイド付き練習セッションとコーチからのリアルタイムフィードバックで、エアリアルカーコントロール、ダブルタップ、エアドリブル、シーリングショットを学びましょう。",
        priceUSD: 22.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "rl-rotation-positioning",
        name: "Rotation & Positioning",
        nameJa: "ローテーション＆ポジショニング",
        description: "Master proper rotation patterns, defensive positioning, and boost management to become a more consistent and reliable teammate in competitive play.",
        descriptionJa: "適切なローテーションパターン、守備ポジショニング、ブースト管理をマスターし、競技プレイでより安定した信頼できるチームメイトになりましょう。",
        priceUSD: 19.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "rl-1v1-analysis",
        name: "1v1 Analysis Session",
        nameJa: "1v1分析セッション",
        description: "Play 1v1 matches against your coach and receive immediate feedback on your challenges, shadow defense, kickoffs, and duel mentality.",
        descriptionJa: "コーチと1v1マッチをプレイし、チャレンジ、シャドウディフェンス、キックオフ、デュエルの心構えについて即座にフィードバックを受けましょう。",
        priceUSD: 24.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "rl-advanced-mechanics",
        name: "Advanced Mechanics Workshop",
        nameJa: "上級メカニクスワークショップ",
        description: "Push your mechanics further with training on flip resets, musty flicks, wave dashes, and speed flips. Designed for players ready to incorporate advanced techniques.",
        descriptionJa: "フリップリセット、マスティフリック、ウェーブダッシュ、スピードフリップのトレーニングでメカニクスをさらに向上。高度なテクニックを取り入れる準備ができたプレイヤー向けです。",
        priceUSD: 34.99,
        delivery: "1.5 hour session",
        deliveryJa: "1.5時間のセッション"
      },
      {
        id: "rl-rank-improvement",
        name: "Rank Improvement Plan (5 Sessions)",
        nameJa: "ランク改善プラン（5セッション）",
        description: "A comprehensive 5-session coaching program that covers mechanics, game sense, replays, and mentality to help you achieve your target rank with lasting improvement.",
        descriptionJa: "メカニクス、ゲームセンス、リプレイ、メンタルをカバーする包括的な5セッションのコーチングプログラムで、持続的な改善とともに目標ランク達成をサポートします。",
        priceUSD: 89.99,
        delivery: "5 sessions (1hr each)",
        deliveryJa: "5セッション（各1時間）"
      }
    ]
  },
  {
    id: "overwatch-2",
    name: "Overwatch 2",
    nameJa: "オーバーウォッチ2",
    slug: "overwatch-2",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg",
    description: "Climb the competitive ladder with personalized Overwatch 2 coaching. Whether you play Tank, DPS, or Support, our coaches tailor sessions to your role and hero pool.",
    descriptionJa: "パーソナライズされたオーバーウォッチ2コーチングで競技ラダーを上昇。タンク、DPS、サポートのどのロールでも、あなたのロールとヒーロープールに合わせたセッションを提供します。",
    services: [
      {
        id: "ow2-role-mastery",
        name: "Role Mastery Coaching (Tank/DPS/Support)",
        nameJa: "ロールマスターコーチング（タンク/DPS/サポート）",
        description: "Focused coaching for your chosen role: learn optimal positioning, ability usage, target priority, and role-specific strategies to carry your weight in competitive matches.",
        descriptionJa: "選択したロールに特化したコーチング：最適なポジショニング、アビリティ使用、ターゲット優先度、ロール別戦略を学び、競技マッチで活躍しましょう。",
        priceUSD: 24.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "ow2-vod-review",
        name: "VOD Review & Analysis",
        nameJa: "VODレビュー＆分析",
        description: "Submit your gameplay recordings and receive a thorough analysis of your positioning mistakes, cooldown usage, and missed opportunities with actionable improvement tips.",
        descriptionJa: "ゲームプレイの録画を提出し、ポジショニングのミス、クールダウン使用、逃した機会について、実践的な改善アドバイスとともに徹底的な分析を受けましょう。",
        priceUSD: 19.99,
        delivery: "60 min session",
        deliveryJa: "60分のセッション"
      },
      {
        id: "ow2-team-synergy",
        name: "Team Synergy Workshop",
        nameJa: "チームシナジーワークショップ",
        description: "Learn team composition strategies, combo ultimates, peel mechanics, and communication callouts to improve your team play and coordination in group matches.",
        descriptionJa: "チーム構成戦略、コンボアルティメット、ピールメカニクス、コミュニケーションコールアウトを学び、グループマッチでのチームプレイと連携を向上させましょう。",
        priceUSD: 29.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      },
      {
        id: "ow2-competitive-climb",
        name: "Competitive Climb Plan (3 Sessions)",
        nameJa: "コンペティティブ上昇プラン（3セッション）",
        description: "A structured 3-session program that identifies your weaknesses, builds a personalized improvement plan, and tracks your progress toward your target rank.",
        descriptionJa: "弱点を特定し、パーソナライズされた改善プランを構築し、目標ランクへの進捗を追跡する構造化された3セッションプログラムです。",
        priceUSD: 59.99,
        delivery: "3 sessions (1hr each)",
        deliveryJa: "3セッション（各1時間）"
      },
      {
        id: "ow2-ultimate-economy",
        name: "Ultimate Economy Training",
        nameJa: "アルティメットエコノミートレーニング",
        description: "Master ultimate tracking, economy management, and engagement timing. Learn when to use ultimates for maximum value and how to counter enemy ult combos.",
        descriptionJa: "アルティメットの追跡、エコノミー管理、交戦タイミングをマスター。最大の価値を得るためのアルティメット使用タイミングと敵のアルトコンボへの対抗方法を学びましょう。",
        priceUSD: 22.99,
        delivery: "1 hour session",
        deliveryJa: "1時間のセッション"
      }
    ]
  }
];
