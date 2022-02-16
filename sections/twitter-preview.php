<?php

use Kirby\Toolkit\Config;
use Kirby\Toolkit\I18n;

return [
  'props' => [
    'headline' => function ($headline = 'Twitter Card Preview') {
      return I18n::translate($headline, $headline);
    }
  ],
  'computed' => [
    'headline' => function () {
      if ($this->headline) {
        return $this->model()->toString($this->headline);
      }

      return ucfirst($this->name);
    },
    'title' => function () {
      $kirby = kirby();
      $model = $this->model();

      if ($kirby->request()->query()->isNotEmpty()) {
        $model = $model->clone(['content' => array_merge(['title' => $model->title()->value()], $model->content()->data(), $kirby->request()->query()->data())]);
      }

      if ($model->site()->id() == $model->id()) {
        return $model->homePage()->toSafeString(
          $model->twitterTemplate()->or(Config::get('coralic.meta-knight.defaultTwitter'))->value(),
          ['title' => $model->homePage()->twitterTitle()->or($model->homePage()->metaTitle()->or($model->homePage()->title()))]
        );
      }

      return $model->twitterTitleComputed();
    },
    'fallbackDescription' => function () {
      $model = $this->model();

      if ($model->site()->id() == $model->id())
        return $model->homePage()->twitterDescription()->or($model->homePage()->metaDescription())->value();

      return $model->site()->twitterDescription()->or($model->site()->metaDescription())->value();
    },
    'fallbackImage' => function () {
      $file = $this->model()->site()->twitterImage()->toFile();

      if ($file) {
        return $file->url();
      }

      return null;
    },
    'url' => function () {
      return $this->model()->url();
    },
  ]
];
